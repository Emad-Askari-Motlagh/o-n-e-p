/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  async redirects() {
    return [
      {
        source: "/",
        destination: "/restaurant",
        permanent: true,
      },
    ];
  },
  webpack: (config, { isServer, dev }) => {
    // Fixes npm packages that depend on `fs` module

    // this will just update topLevelAwait property of config.experiments
    // config.experiments.topLevelAwait = true

    config.module.rules.push({
      test: /\.graphql?$/,
      loader: "webpack-graphql-loader",
    });

    return config;
  },
  env: {
    CONTENTFUL_SPACE_ID: process.env.CONTENTFUL_SPACE_ID,
    CONTENTFUL_ACCESS_TOKEN: process.env.CONTENTFUL_ACCESS_TOKEN,
    SERVER_LINK: process.env.SERVER_LINK,
    SERVER_LINK_DEVELOPMENT: process.env.SERVER_LINK_DEVELOPMENT,
    SERVER_LINK_PRODUCTION: process.env.SERVER_LINK_PRODUCTION,
    MONGODB_URI: process.env.MONGODB_URI,
    SENDGRID_API_KEY: process.env.SENDGRID_API_KEY,
    SECRET: process.env.SECRET,
    STRIPE_KEY: process.env.STRIPE_KEY,
  },
};

module.exports = nextConfig;
