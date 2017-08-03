import 'babel-polyfill'
import React from 'react'
import { render } from 'react-dom'
import debounce from 'lodash.debounce'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { MuiThemeProvider, createMuiTheme } from 'material-ui/styles'
import createPalette from 'material-ui/styles/palette'
import { red, blue } from 'material-ui/colors'
import {batchedSubscribe, middleware as asyncWorkMiddleware, reducer as asyncWorkReducer} from '@josulliv101/connect-async-work'
//
import { configureStore } from './redux/createStore'
import App from './components/App'

const theme = createMuiTheme({
  palette: createPalette({
    primary: blue,
    accent: red,
    type: 'light',
    overrides: {
      MuiCircularProgress: {
        // Name of the styleSheet
        primaryColor: {
          color: 'white',
        },
      },
    },
  }),
})

const store = configureStore(window.__initialState__)
const history = createHistory()

render(
  <Provider store={store}>
    <MuiThemeProvider theme={theme}>
      <Router history={history}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
