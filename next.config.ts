import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 65, 70, 75, 80, 85],
    imageSizes: [16, 32, 48, 64, 96, 128, 144, 208, 256, 384],
    deviceSizes: [384, 480, 640, 750, 828, 1080, 1200, 1920],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    inlineCss: true,
  },
};

export default withNextIntl(nextConfig);
