const path = require('path');

const webpack = require('webpack');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env) {
  const webpackConfig = {
    entry: {
      app: [
        './client.js',
      ],
      vendor: [
        'babel-polyfill',
        'react',
        'react-dom',
      ],
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: '[name].js',
      publicPath: '/',
    },
    resolve: {
      alias: {
      },
      modules: [
        'node_modules',
        path.resolve(__dirname, 'client'),
      ],
      extensions: [
        '*',
        '.js',
        '.json',
        '.jsx',
      ],
    },
    module: {
      loaders: [
        {
          test: /\.css$/,
          loader: ExtractTextPlugin.extract({
            fallback: 'style-loader',
            loader: 'css-loader',
          }),
        },
        {
          test: /\.(eot|ttf|woff|woff2|svg)$/,
          loader: 'file-loader?name=fonts/[name].[ext]',
        },
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: [
            {
              loader: 'babel-loader',
              query: {
                presets: ['react', 'es2015', 'stage-0'],
                // plugins: ["transform-decorators-legacy"],
                // babelrc: false
              }
            }
          ]
        },
      ],
    },
    plugins: [
      new CleanWebpackPlugin(['build']),
      new webpack.ProvidePlugin({
        React: 'react',
        ReactDOM: 'react-dom',
      }),
      new webpack.DefinePlugin({
        'process.env': {
          // This has effect on the react lib size
          NODE_ENV: JSON.stringify('production'),
        },
      }),
      new ExtractTextPlugin('public/bundle.[contenthash].css'),
      new webpack.optimize.CommonsChunkPlugin({
          names: ['vendor']
      }),
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      })
    ],
    devtool: 'source-map',
    stats: {
      children: false,
      assets: false,
      colors: true,
      version: false,
      hash: false,
      timings: false,
      chunks: false,
      chunkModules: false
    },
  };

  return webpackConfig;
};