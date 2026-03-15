import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  // basePath is read from env var — zero code change needed for Vercel vs GitHub Pages
  basePath: process.env.NEXT_PUBLIC_BASE_PATH ?? '',
  trailingSlash: true,
  images: {
    unoptimized: true, // Required for static export (no Next.js Image Optimization server)
  },
};

export default nextConfig;
