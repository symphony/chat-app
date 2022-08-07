import path from 'path';
import { WebpackConfiguration } from 'webpack-dev-server';
import nodeExternals from 'webpack-node-externals';
import HtmlWebpackPlugin from 'html-webpack-plugin';

const clientConfig: WebpackConfiguration = {
  name: 'client',
  target: 'web',
  mode: 'development',
  entry: './src/public/scripts/client.ts',
  devServer: {
    static: './dist',
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: 'Output Management',
    }),
  ],
  resolve: {
    extensions: ['.ts', 'js', '.html', '.scss'],

  },
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
    filename: '[name].bundle.js',
    clean: true,
  },
};

const serverConfig: WebpackConfiguration = {
  name: 'server',
  // target: 'node',
  entry: './src/server/index.ts',
  mode: 'development',
  resolve: {
    extensions: ['.ts', 'js',],
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
    filename: '[name].bundle.js',
    publicPath: '/server',
  },
  externalsPresets: { node: true },
  externals: [nodeExternals()],
};

export default [
  clientConfig,
  serverConfig,
];
