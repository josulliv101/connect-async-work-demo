/*eslint-disable no-console */
import express from 'express'
import serialize from 'serialize-javascript'

import webpack from 'webpack'
import webpackDevMiddleware from 'webpack-dev-middleware'
import webpackConfig from './webpack.config.development'

import React from 'react'
import ReactDOMServer from 'react-dom/server'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import { batchedSubscribe } from './batchedSubscribe'

import {
  middleware as asyncWorkMiddleware, 
  reducer as asyncWorkReducer,
  // AsyncWorkRenderer
} from '@josulliv101/connect-async-work'

import App from './components/App'

import { JssProvider, SheetsRegistry } from 'react-jss'
import { create } from 'jss';
import preset from 'jss-preset-default';
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { blue, red } from 'material-ui/colors';


var favicon = require('serve-favicon')
var path = require('path')

const app = express()
app.use(favicon(path.join(__dirname, 'favicon.ico')))

const middlewares = [
  asyncWorkMiddleware, 
]

const reducer = combineReducers({
  asyncwork: asyncWorkReducer,
})

const enhancers = [
  applyMiddleware(...middlewares),
  batchedSubscribe((notify, state) => {
    console.log('state', state)
    if (!state || !state.asyncwork || !state.asyncwork.loadState) return // notify()
    const {loadState} =  state.asyncwork
    const loading = Object.keys(loadState).some(key => loadState[key] && loadState[key].loading)
    if (!loading) notify()
  })
]

const compiler = webpack(webpackConfig);

app.use(webpackDevMiddleware(compiler, {
  publicPath: '/__build__/',
  stats: {
    colors: true
  }
}));

const HTML = ({ content, store, css }) => (
  <html>
    <head>
      <title>connect-async-work server rendering example</title>
      <meta charSet="utf8"/>
      <link rel="stylesheet" href="//fonts.googleapis.com/css?family=Roboto:100,300,400,500" />
    </head>
    <body>
      <div id="root" dangerouslySetInnerHTML={{ __html: content }}/>
      <style id="jss-server-side" dangerouslySetInnerHTML={{ __html: css }} />
      <script dangerouslySetInnerHTML={{ __html: `window.__initialState__=${serialize(store)}` }}/>
      <script src="/__build__/bundle.js"/>
    </body>
  </html>
)

app.use(function (req, res) {


  // Create a sheetsRegistry instance.
  const sheetsRegistry = new SheetsRegistry();

  // Create a theme instance.
  const theme = createMuiTheme({
    palette: createPalette({
      primary: blue,
      accent: red,
      type: 'light',
    }),
    overrides: {
      MuiCircularProgress: {
        // Name of the styleSheet
        primaryColor: {
          color: 'white',
        },
      },
    },
  });

  // Configure JSS
  const jss = create(preset());
  jss.options.createGenerateClassName = createGenerateClassName;

  console.log('SERVER req for %s', req.url)

  const context = {}

  const store = createStore(reducer, compose(...enhancers))

  const component = () => (
    <Provider store={store}>
      <StaticRouter context={{}} location={req.url}>
        <JssProvider registry={sheetsRegistry} jss={jss}>
          <MuiThemeProvider theme={theme} sheetsManager={new WeakMap()}>
            <App />
          </MuiThemeProvider>
        </JssProvider>
      </StaticRouter>
    </Provider>
  )

  let unsubscribe = store.subscribe(() => {
    console.log('###subscribe', store.getState())
    unsubscribe()
    const content = ReactDOMServer.renderToString(component())
    handleResponse(content)
  })

  console.time('ReactDOMServer.renderToString')
  // Need an initial pass at rendering to kick off async work 
  const contentFirstPass = ReactDOMServer.renderToString(component())
  console.timeEnd('ReactDOMServer.renderToString')

  if (Object.keys(store.getState().asyncwork.loadState).length === 0) {
    unsubscribe()
    handleResponse(contentFirstPass)
    return
  }

  function handleResponse(html) {
    const css = sheetsRegistry.toString()
    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      })
      res.end()
    } else {
      res.write(`
        <!doctype html>
        ${ReactDOMServer.renderToStaticMarkup(<HTML content={html} css={css} store={store.getState()} />)}
      `)
      res.end()
    } 
  }
})

app.listen(8080, function () {
  console.log('Server listening on http://localhost:8080, Ctrl+C to stop')
})


