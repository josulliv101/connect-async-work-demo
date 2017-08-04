import path from 'path'
import http from 'http'
import express from 'express'
import favicon from 'serve-favicon'
//
import serverRender from './serverRender'

const PORT = process.env.PORT || 8080

const app = express()
app.use(favicon(path.join(__dirname, 'favicon.ico')))
app.use('/build', express.static(path.join(__dirname, 'build')));
app.use(serverRender)

const server = http.createServer(app);

server.listen(PORT, function () {
  console.log(`Server listening on http://<prod>:${PORT}, Ctrl+C to stop`)
})
