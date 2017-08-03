import React from 'react'
import { create } from 'jss';
import ReactDOMServer from 'react-dom/server'
import { Provider } from 'react-redux'
import { StaticRouter } from 'react-router'
import preset from 'jss-preset-default';
import { JssProvider, SheetsRegistry } from 'react-jss'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles';
import createPalette from 'material-ui/styles/palette';
import createGenerateClassName from 'material-ui/styles/createGenerateClassName';
import { blue, red } from 'material-ui/colors';
import { batchedSubscribe } from '@josulliv101/connect-async-work'
//
import { batchAsyncWork } from './utils'
import { App, Html } from './components'
import { configureStore } from './redux/createStore'


export default function (req, res) {

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

  // Add an enhancer to the store that only emits once all the async work is complete.
  // It doesn't emit for anything else... only on async work completion (if any).
  // This enhancer is only included on the server.
  const store = configureStore(undefined, batchedSubscribe(batchAsyncWork))
  const context = {}
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

  // Listen when the async work is done.
  let unsubscribe = store.subscribe(() => {
    // All data loaded for second pass
    const contentSecondPass = ReactDOMServer.renderToString(component())
    return handleResponse(contentSecondPass)
  })

  // Don't like calling 'renderToString' twice (above & below) -- but maybe the dispatched
  // actions associated with a url can be cached on the server so that 2 passes at
  // rendering (for pages with async data) only happens on the first load of a url.
  // Or another option may be to create a speedy custom renderer who's only purpose is
  // to fire off async work and knows to avoid parts of a site flagged as 'static'.

  // Render the html. This enables components to fire off async work.
  const contentFirstPass = ReactDOMServer.renderToString(component())

  // If the first render didn't fire off any async work, we're done, return the html
  if (Object.keys(store.getState().asyncwork.loadState).length === 0) {
    return handleResponse(contentFirstPass)
  }

  function handleResponse(content) {
    
    const css = sheetsRegistry.toString()
    const spinner = `
      .spinner {
          -webkit-animation-name: spin;
          -webkit-animation-duration: 2000ms;
          -webkit-animation-iteration-count: infinite;
          -webkit-animation-timing-function: linear;
          -moz-animation-name: spin;
          -moz-animation-duration: 2000ms;
          -moz-animation-iteration-count: infinite;
          -moz-animation-timing-function: linear;
          -ms-animation-name: spin;
          -ms-animation-duration: 2000ms;
          -ms-animation-iteration-count: infinite;
          -ms-animation-timing-function: linear;
          
          animation-name: spin;
          animation-duration: 2000ms;
          animation-iteration-count: infinite;
          animation-timing-function: linear;
      }
      @-ms-keyframes spin {
          from { -ms-transform: rotate(0deg); }
          to { -ms-transform: rotate(360deg); }
      }
      @-moz-keyframes spin {
          from { -moz-transform: rotate(0deg); }
          to { -moz-transform: rotate(360deg); }
      }
      @-webkit-keyframes spin {
          from { -webkit-transform: rotate(0deg); }
          to { -webkit-transform: rotate(360deg); }
      }
      @keyframes spin {
          from {
              transform:rotate(0deg);
          }
          to {
              transform:rotate(360deg);
          }
      }
    `
    // Cleanup
    unsubscribe()

    if (context.url) {
      res.writeHead(301, {
        Location: context.url
      })
      res.end()
    } else {
      res.write(`
        <!doctype html>
        ${ReactDOMServer.renderToStaticMarkup(<Html content={content} css={css+spinner} store={store.getState()} />)}
      `)
      res.end()
    } 
  }
}

