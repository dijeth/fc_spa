const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

const root = process.env.ROOT_ROUTE === 'false' ? '/' : process.env.ROOT_ROUTE;

module.exports = {
  entry: './src/index.jsx',
  output: {
    filename: 'bundle.js',
    path: path.join(__dirname, 'public'),
  },
  devServer: {
    contentBase: path.join(__dirname, 'public'),
    open: false,
//    allowedHosts: 'all',
    host: '0.0.0.0',
    port: 1338,
    historyApiFallback: true,
    publicPath: '/',
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
    ],
  },

  resolve: {
    extensions: ['.js', '.jsx', 'json'],
  },

  devtool: 'source-map',

  plugins: [
    new webpack.DefinePlugin({
      ROOT_ROUTE: JSON.stringify(root),
      API: JSON.stringify(process.env.API || 'http://localhost:8000/api'),
      IMAGE_URL: JSON.stringify(process.env.IMAGE_URL || 'http://localhost:8000/images'),
    }),
    new HtmlWebpackPlugin({
      publicPath: root,
      filename: path.join(__dirname, 'public', 'index.html'),
      template: path.join(__dirname, 'src', 'index.ejs'),
      templateParameters: {
        root,
      },
    }),
    // new BundleAnalyzerPlugin(),
  ],
};
