/** @type {import('next').NextConfig} */
const nextConfig = {
    experimental: {
        appDir: true
    },
    env: {
        API_URL : "http://localhost:4001/api/v1",
    }
}

module.exports = nextConfig
