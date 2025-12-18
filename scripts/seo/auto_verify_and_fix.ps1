<#
Auto SEO verify & fix script (PowerShell)
- Checks HTTP -> HTTPS redirect (expects 301 to https://host)
- Verifies HTTPS page returns 200, no noindex, and contains absolute JSON-LD URLs
- Verifies sitemap references HTTPS
- Optionally purges Cloudflare cache for specified URLs (requires Zone ID & API Token)
- Optionally triggers Vercel redeploy (requires Vercel Token & Project ID)

Usage examples:
  # Dry run checks only
  .\auto_verify_and_fix.ps1 -Host 'apparelstockhub.com' -Paths @('/') -DryRun

  # Full run with Cloudflare purge
  .\auto_verify_and_fix.ps1 -Host 'apparelstockhub.com' -Paths @('/') -CloudflareZoneId 'ZONE_ID' -CloudflareApiToken 'TOKEN'

Notes:
- Keep API tokens secret. This script does not store them persistently.
- Search Console "Request Indexing" cannot reliably be automated for arbitrary pages (Indexing API is limited); this script focuses on checks + cache clearing + redeploy.
#>

param(
    [Parameter(Mandatory=$true)] [string]$SiteHost,
    [string[]]$Paths = @('/'),
    [switch]$DryRun,
    [string]$CloudflareZoneId,
    [string]$CloudflareApiToken,
    [string]$VercelToken,
    [string]$VercelProjectId
)

function Write-OK($msg){ Write-Host "✅ $msg" -ForegroundColor Green }
function Write-Warn($msg){ Write-Host "⚠️ $msg" -ForegroundColor Yellow }
function Write-Err($msg){ Write-Host "❌ $msg" -ForegroundColor Red }

$httpUrl = "http://$SiteHost"
$httpsUrl = "https://$SiteHost"

Write-Host "Running checks for host: $SiteHost"

# 1) Check HTTP -> redirect
Write-Host "\n[1] Checking HTTP -> HTTPS redirect..."
try {
    try { $r = Invoke-WebRequest -Uri $httpUrl -UseBasicParsing -MaximumRedirection 0 -ErrorAction Stop }
    catch { $r = $_.Exception.Response }
    if ($null -ne $r) {
        $status = $null
        try { $status = $r.StatusCode.Value__ } catch { $status = $r.StatusCode }
        $location = $null
        try { $location = $r.Headers['Location'] } catch {}
        Write-Host "HTTP status: $status"
        if ($location) { Write-Host "Location: $location" }
        if ($status -in 301,302) { Write-OK "HTTP redirects (status $status)." }
        else { Write-Warn "Expected redirect (301/302), got $status." }
    } else {
        Write-Warn "No response received for HTTP request." 
    }
} catch { Write-Err "Failed to check HTTP redirect: $_" }

# 2) Check HTTPS page
Write-Host "\n[2] Checking HTTPS pages:"
foreach ($p in $Paths) {
    $url = ([Uri]::new($httpsUrl, $p)).AbsoluteUri
    Write-Host "- Testing $url"
    try {
        $r2 = Invoke-WebRequest -Uri $url -UseBasicParsing -ErrorAction Stop
        $code = $null
        try { $code = $r2.StatusCode.Value__ } catch { $code = $r2.StatusCode }
        Write-Host "  Status: $code"
        if ($code -eq 200) { Write-OK "  Page returns 200." }
        else { Write-Warn "  Page returned $code" }

        # Check for noindex meta (case-insensitive)
        $hasNoindex = $false
        $metaPattern = @'
(?i)<meta[^>]*\bname\s*=\s*["']robots["'][^>]*\bcontent\s*=\s*["']([^"']+)["']
'@
        $m = [regex]::Match($r2.Content, $metaPattern)
        if ($m.Success) {
            $metaContent = $m.Groups[1].Value
            if ($metaContent -match '(?i)noindex') { $hasNoindex = $true }
        }
        if ($hasNoindex) { Write-Warn "  Page contains noindex meta." } else { Write-OK "  No noindex meta found." }

        # Check JSON-LD presence and absolute URLs
        $jsonldPattern = @'
(?is)<script[^>]*\btype=[^>]*application/ld\+json[^>]*>(.*?)</script>
'@
        $jsonldMatches = [regex]::Matches($r2.Content, $jsonldPattern)
        if ($jsonldMatches.Count -gt 0) {
            Write-Host "  Found $($jsonldMatches.Count) JSON-LD block(s)."
            foreach ($match in $jsonldMatches) {
                $j = $match.Groups[1].Value
                if ($j -match 'https?://') { Write-OK "    Contains absolute URL(s)." } else { Write-Warn "    No absolute URLs found inside JSON-LD (consider switching to absolute URLs)." }
            }
        } else { Write-Warn "  No JSON-LD found on page." }

    } catch { Write-Err ("  Error fetching {0}: {1}" -f $url, $_.Exception.Message) }
}

# 3) Check sitemap
Write-Host "\n[3] Checking sitemap.xml for HTTPS references..."
try {
    $sm = Invoke-WebRequest -Uri "$httpsUrl/sitemap.xml" -UseBasicParsing -ErrorAction Stop
    if ($sm.StatusCode.Value__ -eq 200) {
        $containsHttps = $sm.Content -match 'https://'
        if ($containsHttps) { Write-OK "sitemap.xml contains HTTPS URLs." } else { Write-Warn "sitemap.xml may not contain HTTPS URLs." }
    } else { Write-Warn "sitemap.xml returned status $($sm.StatusCode.Value__)" }
} catch { Write-Warn "Could not fetch sitemap.xml: $_" }

# 4) Optionally purge Cloudflare cache
if ($CloudflareZoneId -and $CloudflareApiToken) {
    if ($DryRun) { Write-Warn "DryRun enabled: skipping Cloudflare purge." }
    else {
        Write-Host "\n[4] Purging Cloudflare cache for paths:"
        $files = @()
        foreach ($p in $Paths) { $files += ([Uri]::new($httpsUrl, $p)).AbsoluteUri }
        Write-Host "  Files to purge: $($files -join ', ')"
        $body = @{ files = $files } | ConvertTo-Json
        try {
            $resp = Invoke-RestMethod -Method POST -Uri "https://api.cloudflare.com/client/v4/zones/$CloudflareZoneId/purge_cache" -Headers @{ Authorization = "Bearer $CloudflareApiToken"; "Content-Type" = "application/json" } -Body $body -ErrorAction Stop
            if ($resp.success) { Write-OK "Cloudflare purge successful." } else { Write-Warn "Cloudflare purge returned success=false." }
        } catch { Write-Err "Cloudflare purge failed: $_" }
    }
} elseif ($CloudflareZoneId -or $CloudflareApiToken) { Write-Warn "Partial Cloudflare credentials provided; need both Zone ID and API Token to purge." }

# 5) Optionally trigger Vercel redeploy
if ($VercelToken -and $VercelProjectId) {
    if ($DryRun) { Write-Warn "DryRun enabled: skipping Vercel redeploy." }
    else {
        Write-Host "\n[5] Triggering Vercel redeploy (by creating a deployment)"
        $uri = "https://api.vercel.com/v13/now/deployments"
        # Simple redeploy: tell Vercel to redeploy the project by hitting the deployments endpoint; project must be linked to token
        $payload = @{ name = $VercelProjectId } | ConvertTo-Json
        try {
            $resp = Invoke-RestMethod -Method POST -Uri $uri -Headers @{ Authorization = "Bearer $VercelToken"; "Content-Type" = "application/json" } -Body $payload -ErrorAction Stop
            if ($resp.id) { Write-OK "Vercel redeploy requested (deployment id: $($resp.id))." } else { Write-Warn "Vercel redeploy request did not return deployment id." }
        } catch { Write-Err "Vercel redeploy failed: $_" }
    }
} elseif ($VercelToken -or $VercelProjectId) { Write-Warn "Partial Vercel credentials provided; need both token and project id to trigger redeploy." }

Write-Host "\nAll done. Next recommended step: run Search Console Live Test / Request Indexing for HTTPS pages and re-run validation."