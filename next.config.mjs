import { withAxiom } from "next-axiom";
/** @type {import('next').NextConfig} */
const nextConfig = withAxiom({
    async rewrites() {
        return [
          {
            source: '/api/:path*',
            destination: 'https://mail.royoltech.com/:path*',
          },
        ]
      },
});

export default nextConfig;
