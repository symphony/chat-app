// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import('snowpack').SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true },
    src: '/dist',
  },
  external: ['react'],
  plugins: [
    /* ... */
  ],
  packageOptions: {
    /* ... */
  },
  devOptions: {
    /* ... */
  },
  buildOptions: {
    /* ... */
  },
  exclude:
    ['**/node_modules/**/*'],
};
