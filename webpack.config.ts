const path = require('path');
import { WebpackConfiguration } from 'webpack-dev-server';

const clientConfig: WebpackConfiguration = {
  name: 'client',
  target: 'web',
  mode: 'development',
  resolve: {
    extensions: ['.ts', '.html', '.scss'],
    modules: ['node_modules'],
  },
  entry: './src/public/scripts/client.ts',
  output: {
    path: path.resolve(__dirname, 'dist/public/scripts'),
    filename: 'client.js',
  },
  module: {
    rules: [
      {
        test: /\.s[ac]ss$/i,
        use: [
          // Creates `style` nodes from JS strings
          "style-loader",
          // Translates CSS into CommonJS
          "css-loader",
          // Compiles Sass to CSS
          "sass-loader",
        ],
      },
    ],
  },
}
const serverConfig: WebpackConfiguration = {
  name: 'server',
  target: 'node',
  entry: './src/server.ts',
  mode: 'development',
  resolve: {
    extensions: ['.ts',],
    modules: ['node_modules'],
  },
  output: {
    path: path.resolve(__dirname, 'dist/index.js'),
    filename: 'server.js',
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ],
  },
};


export default [
  clientConfig,
  serverConfig,
];


// export default [
//   {
//     name: 'client',
//     target: 'web',
//     mode: 'development',
//     entry: './src/public/scripts/client.ts',
//     resolve: {
//       extensions: ['.ts', '.html', '.scss'],
//       modules: ['node_modules'],
//     },
//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       filename: 'client.js',
//     },
//   },
//   {
//     name: 'server',
//     target: 'node',
//     mode: 'development',
//     entry: './src/server.ts',
//     resolve: {
//       extensions: ['.ts', 'js',],
//       modules: ['node_modules'],
//     },
//     output: {
//       path: path.resolve(__dirname, 'dist'),
//       filename: 'server.js',
//     },
//   }];