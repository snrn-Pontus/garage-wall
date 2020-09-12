const postcss = require('rollup-plugin-postcss');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');
const bundleSize = require('rollup-plugin-bundle-size');
const analyze = require('rollup-plugin-analyzer');

module.exports = {
  rollup(config, options) {
    config.plugins.push(
      postcss({
        plugins: [
          autoprefixer(),
          cssnano({
            preset: 'default',
          }),
        ],
      })
    );
    config.plugins.push(bundleSize());
    config.plugins.push(analyze());
    return config;
  },
};
