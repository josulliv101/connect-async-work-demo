/*eslint-disable no-console */
import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './webpack.config.development'
//
import serverRender from './serverRender'

const PORT = process.env.PORT || 3000
const app = express()
const compiler = webpack(webpackConfig)

app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use('/build', express.static(path.join(__dirname, 'build')));
app.use(webpackDevMiddleware(webpack(webpackConfig), {
  publicPath: '/build/',
  stats: {
    colors: true
  }
}))

app.use(serverRender)

app.listen(PORT, function () {
  console.log(`Server listening on http://localhost:${PORT}, Ctrl+C to stop`)
})
