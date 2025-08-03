// @ts-nocheck // 临时忽略类型检查（可选）
/** @type {import('next').NextConfig} */
const nextConfig = {
  devIndicators: false,
  images: {
    domains: ["yourdomain.com"],
    formats: ["image/webp", "image/avif"],
  },
  // webpack(config, options) {
  //   const { isServer, dev } = options; // 解构 options
  //   if (!isServer) {
  //     config.optimization.splitChunks = {
  //       chunks: "all",
  //       cacheGroups: {
  //         vendor: {
  //           test: /[\\/]node_modules[\\/]/,
  //           name: "vendors",
  //           chunks: "all",
  //           maxInitialRequests: 5, // 限制初始请求数
  //           minSize: 20000,
  //         },
  //       },
  //     };
  //   }



  //   return config;
  // },
};

module.exports = nextConfig;
