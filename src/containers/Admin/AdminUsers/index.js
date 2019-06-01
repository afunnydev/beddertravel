import React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import withStyles from '@material-ui/core/styles/withStyles';

import Edit from '@material-ui/icons/Edit';
import Close from '@material-ui/icons/Close';

import MessageError from 'components/MessageError';
import Table from 'components/Table';

import adminUsersStyle from './adminUsersStyle';

const USERS_QUERY = gql`
  query USERS_QUERY {
    users {
      id
      email
      firstname
      lastname
    }
  }
`;

class AdminUsers extends React.Component {
  state = {}
  render() {
    const { classes } = this.props;
    const lineButtons = [
      { color: 'success', icon: Edit },
      { color: 'danger', icon: Close },
    ];
    const actionButtons = (id, name) => (
      lineButtons.map((prop, key) => (
        <Button
          color={prop.color}
          key={key}
          onClick={() => {
            prop.color === 'success' ?
              this.props.history.push(`/admin/user/${id}`) :
              this.makeAction(id, name);
          }}
        >
          <prop.icon className={classes.icon} />
        </Button>
      ))
    );

    return (
      <Query
        query={USERS_QUERY}
      >
        {({ data, loading, error }) => {
          if (error) return <MessageError error={error} />;
          if (loading) return <p>Loading...</p>;
          const userTable = data ? data.users.map(user => [user.id, user.email, user.firstname, user.lastname, actionButtons(user.id, user.firstname)]) : null;
          const userTableHead = ['ID', 'Email', 'First name', 'Last name', 'Actions'];
          return (
            <Card>
              <CardHeader color="success" icon>
                <h4>
                  Utilisateurs
                </h4>
              </CardHeader>
              <CardContent>
                <Grid container justify="space-between">
                  <Grid item xs={12} sm={12} md={12}>
                    {userTable && <Table
                      tableData={userTable}
                      tableHead={userTableHead}
                      customCellClasses={[
                        classes.center,
                      ]}
                      customClassesForCells={[4]}
                      customHeadCellClasses={[
                        classes.center,
                      ]}
                      customHeadClassesForCells={[4]}
                    />}
                  </Grid>
                </Grid>
              </CardContent>
            </Card>
          );
        }}
      </Query>
    );
  }
}

export default withStyles(adminUsersStyle)(AdminUsers);
