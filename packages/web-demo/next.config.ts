import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production"

const nextConfig: NextConfig = {
  output: "export",
  basePath: isProd ? "/js-jieba" : undefined,
  assetPrefix: isProd ? "/js-jieba/" : undefined,
};

export default nextConfig;
