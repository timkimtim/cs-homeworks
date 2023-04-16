const path = require('path');

const resolve = (p) => path.resolve(__dirname, p);

const ROOT = 'src';

module.exports = {
  webpack: {
    alias: {
      '@': resolve(ROOT),
    },
    configure: (webpackConfig) => {
      webpackConfig.module.rules.push({
        test: /\.mjs$/,
        include: /node_modules/,
        type: 'javascript/auto',
      });
      return webpackConfig;
    },
  },
  resolve: {
    alias: {
      process: 'process/browser',
    },
  },
};
