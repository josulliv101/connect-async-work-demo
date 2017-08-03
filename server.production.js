import path from 'path'
import express from 'express'
import favicon from 'serve-favicon'
//
import serverRender from './serverRender'

const app = express()
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use('/build', express.static(path.join(__dirname, 'build')));
app.use(serverRender)

const server = http.createServer(app);

server.listen(process.env.PORT || 8080, function () {
  console.log('Server listening on http://<prod>:8080, Ctrl+C to stop')
})
