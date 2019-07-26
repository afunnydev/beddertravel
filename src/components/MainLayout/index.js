import React from 'react';
import { compose } from 'redux';
import styled from 'styled-components';

import withWidth from '@material-ui/core/withWidth';
import Icon from '@material-ui/core/Icon';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import Hidden from '@material-ui/core/Hidden';

import { WithRoleContext } from 'containers/AppContext/context';

import Header from './Header';
import LeftDrawer from './LeftDrawer';
import Footer from './Footer';
import BottomMenuBar from './BottomMenuBar';

const MainContainer = styled.div`
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
    };
  }

  handleChangeRequestNavDrawer = () => {
    this.setState({
      navDrawerOpen: !this.state.navDrawerOpen,
    });
  }

  render() {
    const { navDrawerOpen } = this.state;

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

        <BottomMenuBar userRole={this.props.role} />

        <Hidden smDown>
          <Footer />
        </Hidden>
      </React.Fragment>
    );
  }
}

export default compose(
  WithRoleContext,
  withMobileDialog(),
  withWidth()
)(MainLayout);
