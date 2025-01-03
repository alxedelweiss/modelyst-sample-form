/** @type {import('next').NextConfig} */
const nextConfig = {
	experimental: {
		appDir: true
	},
	async rewrites() {
		return [
			{
				source: '/:path*',
				destination: 'http://127.0.0.1:8000/:path*/' // Proxy to Backend
			}
		]
	}
}

module.exports = nextConfig