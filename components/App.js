import raf from 'raf/polyfill'
import React, { Component } from 'react'
import { connect } from 'react-redux'
import compose from 'recompose/compose'
import { Route, Switch as RouteSwitch, withRouter } from 'react-router-dom'
import Button from 'material-ui/Button'
import { DelayRoute } from '@josulliv101/delay-route'

import classNames from 'classnames'
import { withStyles, createStyleSheet } from 'material-ui/styles'
import { white, common } from 'material-ui/colors'
import Typography from 'material-ui/Typography'
import AppBar from 'material-ui/AppBar'
import Toolbar from 'material-ui/Toolbar'
import IconButton from 'material-ui/IconButton'
import MenuIcon from 'material-ui-icons/Menu'
import Fav from 'material-ui-icons/FavoriteBorder'
import { CircularProgress } from 'material-ui/Progress';
import { FormControlLabel } from 'material-ui/Form';
import Switch from 'material-ui/Switch';

// import 'typeface-roboto'
import getRoutes from '../routes'
import AppDrawer from './AppDrawer'
import Github from './icons/GitHub';

const styleSheet = createStyleSheet('AppFrame', theme => ({

  '@global': {
    html: {
      boxSizing: 'border-box',
    },
    '*, *:before, *:after': {
      boxSizing: 'inherit',
    },
    body: {
      margin: 0,
      background: theme.palette.background.default,
      color: theme.palette.text.primary,
      fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
      lineHeight: '1.2',
      overflowX: 'hidden',
      WebkitFontSmoothing: 'antialiased', // Antialiasing.
      MozOsxFontSmoothing: 'grayscale', // Antialiasing.
    },
    img: {
      maxWidth: '100%',
      height: 'auto',
      width: 'auto',
    },
    '.delay-route > div:nth-child(2)': {
      display: 'none',
    },
    'h1,h2,h3,h4,h5,h6': {
      fontWeight: 400,
    },
    '.loadStatus': {
      padding: theme.spacing.unit * 2,
      border: `${common.lightBlack} 1px solid`,
    },
  },
  root: {
    display: 'flex',
    alignItems: 'stretch',
    minHeight: '100vh',
    width: '100%',
  },
  grow: {
    flex: '1 1 auto',
  },
  title: {
    marginLeft: 24,
    flex: '0 1 auto',
  },
  flex: {
    flex: 1,
  },
  drawer: {
    width: '250px',
  },
  appBarShift: {
    width: 'calc(100% - 250px)',
  },
  progress: {
    position: 'absolute',
    zIndex: 999,
    top: 16,
    left: `calc(50% - ${theme.spacing.unit * 2}px)`,
    // transform: 'translate(-50%, 19%)',
    margin: `0`,
    width: 36,
    height: 36,
  },
  primaryColor: {
    color: 'white',
  },
  logo: {
    width: 36,
    height: 36,
  },
  lite: {
    opacity: .4,
  },
  loadingHint: {
    fontWeight: 300,
    fontSize: 16,
  },
  content: theme.mixins.gutters({
    paddingTop: 80,
    flex: '1 1 100%',
    maxWidth: '100%',
    margin: '0 auto',
  }),
  footer: {
    bottom: 0,
    left: 'auto',
    right: 0,
    position: 'fixed',
    width: 'calc(100% - 250px)',
    background: common.faintBlack,
    color: common.lightBlack,
    '& > p': {
      lineHeight: '64px',
      '& > :first-child': {
        position: 'relative',
        top: 3,
      }
    }
  },
  [theme.breakpoints.up(948)]: {
    content: {
      maxWidth: 900,
    },
  },
}));


const App = ({ loading, classes }, { asyncRender = false }) => (
  <div className={classes.root}>
    <AppBar elevation={1} className={classes.appBarShift}>
      <Toolbar className={classNames(classes.primaryColor)} >
        <Typography type="title" color="inherit" className={classes.flex}>
          demo {loading && <span className={classes.loadingHint}>/ loading</span>}
        </Typography>
        <Fav className={classNames(classes.logo, classes.progress)} />
        <IconButton
          component="a"
          title="GitHub"
          target="_blank"
          disableRipple={true} /* Avoids issue with react 16 beta 3 and Transition */
          color="contrast"
          href="https://github.com/josulliv101/connect-async-work-demo"
        >
          <Github />
        </IconButton>
      </Toolbar>
    </AppBar>
    <AppDrawer
      className={classes.drawer}
      docked={true}
      routes={{ routes: getRoutes() }}
      onRequestClose={noop => noop}
      open={true}
    />
    <section className={classNames(classes.content, {[classes.lite]: loading})}>
      <main className="delay-route" >
        <DelayRoute delay={loading} >
          <RouteSwitch>
            { getRoutes()
                .reduce((arr, item) => arr.concat(item.routes), [])
                .map( ({label, linkPath, ...route}) => <Route key={label} {...route} /> ) 
            }
          </RouteSwitch>
        </DelayRoute>
      </main>
    </section>
    <footer className={classes.footer}>
      <Typography align="center" color="inherit"><Fav style={{width: 16, height: 16}} />  Check out the next version of <a style={{fontWeight: 500}} target="_blank" href="https://material-ui-1dab0.firebaseapp.com/">Material-UI</a>.</Typography>
    </footer>
  </div> 
)

const mapStateToProps = ({asyncwork: {loadState}}) => ({
  // Checks if any keys are loading. The load property on HOCs is only for specified work.
  loading: Object.keys(loadState).some(key => loadState[key] && loadState[key].loading),
})

export default withRouter(compose(withStyles(styleSheet), connect(mapStateToProps))(App))
