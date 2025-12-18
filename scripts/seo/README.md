SEO automation scripts

Files
- auto_verify_and_fix.ps1 - PowerShell script to run redirect checks, HTTPS page checks, sitemap check, and optionally purge Cloudflare cache / trigger Vercel redeploy.

Quick usage
1. Dry run checks only:
   ```powershell
   .\auto_verify_and_fix.ps1 -SiteHost 'apparelstockhub.com' -Paths @('/') -DryRun
   ```

2. With Cloudflare purge (replace ZONE_ID and TOKEN):
   ```powershell
   .\auto_verify_and_fix.ps1 -Host 'apparelstockhub.com' -Paths @('/') -CloudflareZoneId 'ZONE_ID' -CloudflareApiToken 'TOKEN'
   ```

3. Trigger Vercel redeploy (replace token/project id):
   ```powershell
   .\auto_verify_and_fix.ps1 -Host 'apparelstockhub.com' -Paths @('/') -VercelToken 'VERCEL_TOKEN' -VercelProjectId 'project-name'
   ```

Notes
- Keep API tokens secret. The script does not store tokens persistently.
- For Search Console "Request Indexing" you currently need to use Search Console UI or set up Google Indexing/URL Inspection API with OAuth; that requires additional configuration and site verification and is not included in this script by default.
