import type { NextConfig } from "next";
import createNextIntlPlugin from "next-intl/plugin";

const withNextIntl = createNextIntlPlugin("./i18n/request.ts");
const nextConfig: NextConfig = {
  images: {
    qualities: [25, 50, 70, 75, 80, 85],
  },
  experimental: {
    inlineCss: true,
  },
};

export default withNextIntl(nextConfig);
