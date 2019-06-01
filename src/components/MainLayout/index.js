import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { compose } from 'redux';

import withWidth from '@material-ui/core/withWidth';
import Icon from '@material-ui/core/Icon';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Hidden from '@material-ui/core/Hidden';
import BottomNavigation from '@material-ui/core/BottomNavigation';
import BottomNavigationAction from '@material-ui/core/BottomNavigationAction';

import { WithRoleContext } from 'containers/AppContext/context';

import {
  ROLE_EXPLORER,
  ROLE_OWNER,
  ROLE_TRAVELER,
} from 'containers/AppContext/constants';

import styled from 'styled-components';

import Header from './Header';
import LeftDrawer from './LeftDrawer';
import Footer from './Footer';

const MainContainer = styled.div`
  padding-bottom: 56px;
  min-height: calc(100vh - 300px);
  margin-top: ${props => props.width === 'xs' ? '56px' : '64px'};
  @media (max-width:  863px) {
    min-height: inherit;
  }
`;

class MainLayout extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      navDrawerOpen: false,
      location: -1,
    };

    if (this.props.location && this.props.location.pathname) {
      // console.log('bingo', this.props)
      switch (this.props.location.pathname) {
        case '/business':
          this.state.location = 2;
          break;
        case '/myAds':
          this.state.location = 0;
          break;
        case '/gains':
          this.state.location = 1;
          break;
        case '/home':
          this.state.location = 3;
          break;
        case '/bookings':
          this.state.location = 4;
          break;
        case '/reservations':
          this.state.location = 5;
          break;
        default:
          this.state.location = -1;
      }
    }
  }

  handleChangeRequestNavDrawer = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  render() {
    const { navDrawerOpen } = this.state;
    const userRole = this.props.role;

    return (
      <React.Fragment>
        <Header
          userRole={this.props.role}
          handleChangeRequestNavDrawer={this.handleChangeRequestNavDrawer}
        />

        <LeftDrawer
          closeFn={this.handleChangeRequestNavDrawer}
          navDrawerOpen={navDrawerOpen}
          userRole={this.props.role}
          menus={[
            {
              text: 'DashBoard',
              icon: <Icon className="fa fa-list" />,
              link: '/dashboard',
            },
          ]}
          username="User Admin"
        />

        <MainContainer width={this.props.width}>{this.props.children}</MainContainer>

        {userRole === ROLE_EXPLORER && (
          <Hidden mdUp>
            <BottomNavigation
              value={this.state.location}
              showLabels
              style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 1301,
              }}
            >
              <BottomNavigationAction
                component={Link}
                to="/myAds"
                label="My Ads"
                icon={<span style={{ minHeight: 20 }} className="icon-ads" />}
              />
              <BottomNavigationAction
                component={Link}
                to="/gains"
                label="Gains"
                icon={<span style={{ minHeight: 20 }} className="icon-gains" />}
              />
              <BottomNavigationAction
                component={Link}
                to="/business"
                label="Add"
                icon={<span style={{ minHeight: 20 }} className="icon-new" />}
              />
            </BottomNavigation>
          </Hidden>
        )}

        {userRole === ROLE_TRAVELER && (
          <Hidden mdUp>
            <BottomNavigation
              value={this.state.location}
              showLabels
              style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 1301,
              }}
            >
              <BottomNavigationAction
                value={3}
                component={Link}
                to="/home"
                label="Search"
                icon={
                  <span style={{ minHeight: 20 }} className="icon-search" />
                }
              />
              <BottomNavigationAction
                value={4}
                component={Link}
                to="/bookings"
                label="Reservation"
                icon={
                  <span
                    style={{ minHeight: 20 }}
                    className="icon-reservation"
                  />
                }
              />
            </BottomNavigation>
          </Hidden>
        )}

        {userRole === ROLE_OWNER && (
          <Hidden mdUp>
            <BottomNavigation
              value={this.state.location}
              showLabels
              style={{
                position: 'fixed',
                bottom: 0,
                width: '100%',
                zIndex: 1301,
              }}
            >
              <BottomNavigationAction
                value={0}
                component={Link}
                to="/ownerAds"
                label="My Ads"
                icon={<span style={{ minHeight: 20 }} className="icon-ads" />}
              />
              <BottomNavigationAction
                value={5}
                component={Link}
                to="/reservations"
                label="Reservation"
                icon={
                  <span
                    style={{ minHeight: 20 }}
                    className="icon-reservation"
                  />
                }
              />
            </BottomNavigation>
          </Hidden>
        )}

        <Hidden smDown>
          <Footer />
        </Hidden>
      </React.Fragment>
    );
  }
}

export default compose(
  withRouter,
  WithRoleContext,
  withMobileDialog(),
  withWidth()
)(MainLayout);
