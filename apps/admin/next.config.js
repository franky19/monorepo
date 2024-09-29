module.exports = {
  env: {
    IS_PRODUCTION: process?.env?.['IS_PRODUCTION'],
    IS_STAGING: process?.env?.['IS_STAGING'],
    IS_SEND_ANALYTICS: process?.env?.['IS_SEND_ANALYTICS'],
    IS_USING_MOCK: process?.env?.['IS_USING_MOCK'],
    IS_SWITCHABLE_ENV: process?.env?.['IS_SWITCHABLE_ENV'],
    BASE_PATH: process?.env?.['BASE_PATH'] ?? '',
  },
  basePath: '/admin',
  reactStrictMode: false,
  transpilePackages: ['ui', 'payment-component'],
  images: {
    domains: [
     'images.unsplash.com'
    ],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**.midtrans.com',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*{/}?',
        headers: [
          {
            key: 'Strict-Transport-Security',
            value: 'max-age=31536000',
          },
          {
            key: 'X-Frame-Options',
            value: 'deny',
          },
          {
            key: 'X-XSS-Protection',
            value: '1',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
        ],
      },
    ];
  },
};
