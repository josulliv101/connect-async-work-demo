const path = require('path');

const webpack = require('webpack');
const CleanWebpackPlugin = require('clean-webpack-plugin');

module.exports = function (env) {
  const webpackConfig = {
    entry: {
      app: [
        './client.js',
      ]
    },
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'bundle.js',
      publicPath: '/build',
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
      new webpack.optimize.UglifyJsPlugin({
        compress: {
          warnings: false,
        },
      })
    ],
    devtool: 'source-map'
  };

  return webpackConfig;
};