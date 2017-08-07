import 'babel-polyfill'
import React from 'react'
import { hydrate } from 'react-dom'
import debounce from 'lodash.debounce'
import { createStore, compose, combineReducers, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import createHistory from 'history/createBrowserHistory'
import { MuiThemeProvider } from 'material-ui/styles'
import { batchedSubscribe, middleware as asyncWorkMiddleware, reducer as asyncWorkReducer } from '@josulliv101/connect-async-work'
//
import { configureStore } from './redux/createStore'
import App from './components/App'
import { theme } from './theme'

const store = configureStore(window.__initialState__)
const history = createHistory()

hydrate(
  <Provider store={store}>
    <MuiThemeProvider theme={theme()}>
      <Router history={history}>
        <App />
      </Router>
    </MuiThemeProvider>
  </Provider>,
  document.getElementById('root')
)
