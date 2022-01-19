/* craco.config.js */
const path = require(`path`);

module.exports = {
  webpack: {
    alias: {
      '@': path.resolve(__dirname, 'src/'),
      '@Components': path.resolve(__dirname, 'src/components'),
      '@Store': path.resolve(__dirname, 'src/store'),
      '@Assets': path.resolve(__dirname, 'src/assets'),
    }
  },
};