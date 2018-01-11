const path = require('path');
const webpack = require('webpack');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const config = require('./config');

const fromRoot = path.resolve.bind(path, __dirname);
const isProduction = process.env.NODE_ENV === 'production';
const publicPath = '/';

module.exports = {
  entry: {
    gleetchy: ['./src/index.js'],
  },
  output: {
    filename: isProduction ? '[name].[chunkhash].js' : '[name].js',
    path: fromRoot('dist'),
    publicPath,
  },
  devtool: isProduction ? 'source-map' : 'cheap-eval-sourcemap',
  devServer: {
    host: 'localhost',
    port: 3000,
    inline: true,
    hot: true,
    historyApiFallback: { index: publicPath },
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: fromRoot('node_modules'),
        use: [{ loader: 'babel-loader' }],
      },
    ],
  },
  plugins: [
    new webpack.EnvironmentPlugin({ NODE_ENV: 'development' }),
    new webpack.DefinePlugin(
      Object.entries(config).reduce((acc, [key, val]) => {
        acc[key] = JSON.stringify(val);
        return acc;
      }, {}),
    ),
    new HtmlWebpackPlugin({
      title: 'react-stripe-elements @1.3.1',
      themeColor: 'white',
      template: fromRoot('src/index.html'),
      inject: 'body',
    }),
    !isProduction && new webpack.HotModuleReplacementPlugin(),
    isProduction && new webpack.optimize.ModuleConcatenationPlugin(),
  ].filter(Boolean),
  resolve: {
    modules: [fromRoot('src'), 'node_modules'],
    extensions: ['.js'],
  },
};
