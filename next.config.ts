import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    async redirects() {
        return [
            {
                source: '/',
                destination: `/calendar/${new Date().getFullYear()}`,
                permanent: false,
            },
        ];
    },};

export default nextConfig;
