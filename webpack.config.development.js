/* eslint-disable */
const path = require('path')
const webpack = require('webpack')

module.exports = {
  devtool: 'eval',
  entry: [
    './client.js'
  ],
  output: {
    path: path.join(__dirname, 'dist'),
    filename: 'bundle.js',
    publicPath: '/'
  },
  resolve: {
    alias: {},
    modules: [
      'node_modules'
    ],
    extensions: ['.js', '.jsx','.css','.woff', '.woff2', '.eot','.ttf','.svg']
  },
  module: {
    loaders: [
      { test: /\.css$/, exclude: /node_modules/, loaders: ['style', 'css-loader'] },
      {
        test: /\.(eot|ttf|woff|woff2|svg)$/,
        exclude: /node_modules/,
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
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoEmitOnErrorsPlugin(),
    new webpack.ProvidePlugin({
      React: 'react',
      ReactDOM: 'react-dom',
    })
  ]
}
