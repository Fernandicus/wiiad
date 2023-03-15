const { env } = require("process");

/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  //reactStrictMode: true,
  /* config options here */

  env: {
    SMTP_USER: process.env.SMTP_USER,
  },
};

module.exports = nextConfig;
