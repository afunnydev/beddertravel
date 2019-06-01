import React from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { ApolloProvider } from 'react-apollo';

import { Helmet } from 'react-helmet';
import styled from 'styled-components';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import AdminUsers from 'containers/Admin/AdminUsers/Loadable';
import AdminUser from 'containers/Admin/AdminUser/Loadable';

import BackButton from 'components/BackButton';

import client from 'utils/createClient';

const PartialGrid = styled(Grid)`
  max-width: 1000px;
  margin: auto;
  padding-top: 40px;
`;

const FloatBackButton = styled(BackButton)`
  float: left;
`;

const Routes = () => (
  <Grid container direction="column">
    <Grid item xs={12}>
      <Link to="/admin/users">All Users</Link>
    </Grid>
    <Grid item xs={12}>
      <Link to="/admin/businesses">All Businesses</Link>
    </Grid>
    <Grid item xs={12}>
      <Link to="/admin/support">All Tickets</Link>
    </Grid>
  </Grid>
);

const Admin = () => (
  <React.Fragment>
    <Helmet>
      <title>Admin</title>
    </Helmet>
    <PartialGrid container direction="row">
      <Grid item xs={12} style={{ marginBottom: 20 }}>
        <FloatBackButton />
        <Typography variant="headline" align="center">Admin</Typography>
      </Grid>
      <Grid item xs={12}>
        <ApolloProvider client={client}>
          <Switch>
            <Route path="/admin/users" component={AdminUsers} />
            <Route path="/admin/user/:id" component={AdminUser} />
            {/* <Route path="/admin/businesses" component={ForgotPage} /> */}
            {/* <Route path="/admin/support" component={SignUpPage} /> */}
            <Route path="/admin" component={Routes} />
          </Switch>
        </ApolloProvider>
      </Grid>
    </PartialGrid>
  </React.Fragment>
);

export default Admin;
