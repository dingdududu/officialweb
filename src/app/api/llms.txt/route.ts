import { NextRequest } from 'next/server';

// 动态生成 llms.txt 内容
export async function GET(request: NextRequest) {
  // 定义允许的公共页面路径
  const allowedPaths = [
    '/products/*',
    '/about',
    '/faqs',
    '/contact'  // 如果将来添加 contact 页面
  ];

  // 定义禁止的路径
  const disallowedPaths = [
    '/admin/*',
    '/api/*',
    '/_next/*'
  ];

  // 生成 llms.txt 内容
  const content = `# llms.txt for apparelstockhub.com
# This file controls how AI/LLMs can use content from this site
# Generated dynamically on ${new Date().toISOString()}

# Allow AI to use public content
${allowedPaths.map(path => `Allow: ${path}`).join('\n')}

# Disallow sensitive or admin areas
${disallowedPaths.map(path => `Disallow: ${path}`).join('\n')}

# Contact for AI training permissions
Contact: info@apparelstockhub.com
`;

  return new Response(content, {
    headers: {
      'Content-Type': 'text/plain',
      'Cache-Control': 'public, max-age=3600'  // 缓存1小时
    }
  });
}
