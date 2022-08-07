const path = require('path');
import { WebpackConfiguration } from 'webpack-dev-server';

const clientConfig: WebpackConfiguration = {
  name: 'client',
  target: 'web',
  mode: 'development',
  resolve: {
    extensions: ['.ts', 'js', '.html', '.scss'],
    modules: ['node_modules'],
    fallback: {
      fs: false,
    },
  },
  entry: './src/public/scripts/client.ts',
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
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
      {
        test: /\.html$/i,
        loader: "html-loader",
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist/public/scripts'),
    filename: 'client.js',
  },
};

const serverConfig: WebpackConfiguration = {
  name: 'server',
  target: 'node',
  entry: './src/server.ts',
  mode: 'development',
  resolve: {
    extensions: ['.ts', 'js',],
    modules: ['node_modules'],
    fallback: {
      fs: false,
    },
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
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'server.js',
  },
  externals: {
    bufferutil: "bufferutil",
    "utf-8-validate": "utf-8-validate",
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