// Snowpack Configuration File
// See all supported options: https://www.snowpack.dev/reference/configuration

/** @type {import('snowpack').SnowpackUserConfig } */
module.exports = {
  mount: {
    public: { url: '/', static: true, resolve: false, },
    src: { url: '/dist' },
  },
  external: ['react'],
  plugins: [
    '@snowpack/plugin-react-refresh',
    '@snowpack/plugin-dotenv',
    '@snowpack/plugin-webpack',
    '@snowpack/plugin-typescript', // TS support
    'snowpack-plugin-svgr' // import SVG as React component
  ],
  optimize: {
    bundle: true,
    minify: true,
    target: 'es2018',
  },
  /* for local SPA fallback routing support, more below */
  routes: [
    { "match": "routes", "src": ".*", "dest": "/index.html" },
  ],
  devOptions: {
    port: 3000,
  },
  testOptions: {
    files: ['src/**/*.test.*']
  },
  alias: {
    components: "./src/components",
    "@app": "./src/",
  },
  exclude:
    ['**/node_modules/**/*'],
};