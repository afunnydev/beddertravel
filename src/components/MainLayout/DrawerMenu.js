import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';

import ListItemText from '@material-ui/core/ListItemText';
import Divider from '@material-ui/core/Divider';
import Hidden from '@material-ui/core/Hidden';

import { withStyles } from '@material-ui/core/styles';

import { changeRoleAction } from 'containers/AppContext/actions';
import {
  ROLE_EXPLORER,
  ROLE_OWNER,
  ROLE_TRAVELER,
} from 'containers/AppContext/constants';
import WithUserContext, {
  WithRoleContext,
} from 'containers/AppContext/context';

import DrawerDialogFeedback from './DrawerDialogFeedback';

import Footer from './Footer';

const styles = {
  wrapper: {
    paddingTop: 0,
    width: 400,
  },
  button: {
    width: 400,
  },
  activeText: {
    fontWeight: 'bold',
  },
};

const DrawerMenuWrapper = props => (
  <List component="nav" style={styles.wrapper}>
    {props.children}
  </List>
);

const DrawerMenuSeparator = () => <Divider />;

const DrawerMenuItemTo = props => (
  <ListItem
    button
    component={Link}
    to={props.to ? props.to : false}
    style={styles.button}
    // onClick={props.onClick}
  >
    <ListItemText
      primary={props.children}
      primaryTypographyProps={{ variant: 'body1' }}
      style={props.active ? styles.activeText : null}
    />
  </ListItem>
);

const DrawerMenuItem = props => (
  <ListItem
    button
    component={props.to ? Link : null}
    to={props.to ? props.to : null}
    style={styles.button}
    onClick={props.onClick}
  >
    <ListItemText
      primary={props.children}
      primaryTypographyProps={{
        variant: 'body1',
        style: props.active ? styles.activeText : null,
      }}
    />
  </ListItem>
);

const DrawerMenu = ({ user, role, dispatch }) => {
  const dispatchRoleExplorer = () => {dispatch(changeRoleAction(ROLE_EXPLORER))};
  const dispatchRoleTraveler = () => {dispatch(changeRoleAction(ROLE_TRAVELER))};
  const dispatchRoleOwner = () => {dispatch(changeRoleAction(ROLE_OWNER))};

  return (
    <DrawerMenuWrapper>
      {user && (
        <React.Fragment>
          {role !== ROLE_TRAVELER ? (
            <React.Fragment>
              <DrawerMenuItemTo to="/businesses">My Businesses</DrawerMenuItemTo>
              <DrawerMenuItemTo to="/earnings">My Earnings</DrawerMenuItemTo>
              <DrawerMenuItem to="/home" onClick={dispatchRoleTraveler}>
                Traveler&#39;s account
              </DrawerMenuItem>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <DrawerMenuItemTo to="/home">
                Search Accomodations
              </DrawerMenuItemTo>
              <DrawerMenuItemTo to="/bookings">My Bookings</DrawerMenuItemTo>
              <DrawerMenuItem to="/businesses" onClick={dispatchRoleExplorer}>
                Explorer&#39;s account
              </DrawerMenuItem>
            </React.Fragment>
          )}

          {/* <DrawerMenuItem to="/reservations" active={role == ROLE_OWNER ? true : false} onClick={dispatchRoleOwner}>Hotel / guided owner</DrawerMenuItem> */}

          {/* <DrawerMenuSeparator /> */}
          {/* <DrawerDialog user={user} btn={DrawerMenuItem} btntext="Manage my alerts"/> */}

          <DrawerMenuSeparator />
        </React.Fragment>
      )}

      {/* <ListItem button style={styles.button}> */}
      {/*   <ListItemText */}
      {/*     primary="Currencies" */}
      {/*     primaryTypographyProps={{ variant: 'body1' }} */}
      {/*   /> */}
      {/*   <ListItemSecondaryAction> */}
      {/*     <Button>CAD₴</Button> */}
      {/*   </ListItemSecondaryAction> */}
      {/* </ListItem> */}

      <DrawerMenuSeparator />
      {!user &&
        <DrawerMenuItemTo to="/home">Search Accomodations</DrawerMenuItemTo>}
      <DrawerMenuItemTo to="/about">About Bedder</DrawerMenuItemTo>
      <DrawerDialogFeedback btn={DrawerMenuItem} btntext="Feedback" />
      {user && (
        <React.Fragment>
          <DrawerMenuItemTo to="/profile">My Settings</DrawerMenuItemTo>

          <DrawerMenuSeparator />
          <DrawerMenuItemTo to="/auth/signOut">Log out</DrawerMenuItemTo>
        </React.Fragment>
      )}

      <Hidden mdUp>
        <Footer />
      </Hidden>
    </DrawerMenuWrapper>
  );
};

export default compose(
  WithUserContext,
  WithRoleContext,
  withStyles(styles),
  connect(),
)(DrawerMenu);
