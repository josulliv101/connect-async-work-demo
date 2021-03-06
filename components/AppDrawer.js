import React from 'react';
import PropTypes from 'prop-types';
import { withStyles, createStyleSheet } from 'material-ui/styles';
import List from 'material-ui/List';
import Toolbar from 'material-ui/Toolbar';
import Drawer from 'material-ui/Drawer';
import Typography from 'material-ui/Typography';
import Divider from 'material-ui/Divider';
import AppDrawerNavItem from './AppDrawerNavItem';
import Link from './Link';

const styleSheet = createStyleSheet(theme => ({
  paper: {
    width: 250,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    color: theme.palette.text.secondary,
    '&:hover': {
      color: theme.palette.primary[500],
    },
  },
  toolbar: {
    flexDirection: 'column',
    alignItems: 'flex-start',
    justifyContent: 'center',
  },
  anchor: {
    color: theme.palette.text.secondary,
  },
}));

function renderNavItems(props, navRoot) {
  let navItems = null;

  if (navRoot.routes && navRoot.routes.length) {
    // eslint-disable-next-line no-use-before-define
    navItems = navRoot.routes.filter(r => !(r.nav === false)).reduce(reduceChildRoutes.bind(null, props), []);
  }

  return (
    <List>
      {navItems}
    </List>
  );
}

function reduceChildRoutes(props, items, childRoute, index) {

  if (childRoute.routes && childRoute.routes.length) {
    const openImmediately = false // props.routes.indexOf(childRoute) !== -1 || false;
    items.push(
      <AppDrawerNavItem key={index} openImmediately={openImmediately} title={childRoute.label}>
        {renderNavItems(props, childRoute)}
      </AppDrawerNavItem>,
    );
  } else {
    items.push(
      <AppDrawerNavItem
        key={index}
        title={childRoute.label}
        to={childRoute.linkPath || childRoute.path}
        onClick={props.onRequestClose}
      />,
    );
  }

  return items;
}

function AppDrawer(props) {
  const classes = props.classes;

  return (
    <Drawer
      className={props.className}
      classes={{
        paper: classes.paper,
      }}
      open={props.open}
      // onRequestClose={props.onRequestClose}
      docked={props.docked}
      // keepMounted
    >
      <div className={classes.nav}>
        <Toolbar className={classes.toolbar}>
          <Link className={classes.title} to="/" onClick={props.onRequestClose}>
            <Typography type="title" gutterBottom color="inherit">
              connect-async-work
            </Typography>
          </Link>
          <Divider absolute />
        </Toolbar>
        {renderNavItems(props, props.routes)}
      </div>
    </Drawer>
  );
}

AppDrawer.propTypes = {
  classes: PropTypes.object.isRequired,
  className: PropTypes.string,
  docked: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  routes: PropTypes.object.isRequired,
};

export default withStyles(styleSheet)(AppDrawer);