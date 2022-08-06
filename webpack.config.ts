import * as webpack from 'webpack';
import 'webpack-dev-server';

const clientConfig: any = {
  name: 'client',
  target: 'web',
  entry: 'src/public/scripts/client.js',
  output: {
    path: 'dist/public/scripts/client.js',
    filename: 'index.js',
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
    resolve: {
      extensions: ['.ts', '.js'],
    },
  },
  "include": [
    "./**/*.ts"
  ]
}
const serverConfig: any = {
  name: 'server',
  target: 'node',
  entry: 'src/server.ts',
  output: {
    path: 'dist',
    filename: 'server.js',
    module: {
      rules: [
        {
          test: /\.tsx?$/,
          use: 'ts-loader',
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
    },
  },
  "include": [
    "./**/*.ts"
  ],
};


export default [
  clientConfig,
  serverConfig,
];