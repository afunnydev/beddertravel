import React from 'react';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';

import { BUSINESS_QUERY } from './index.js';

const UPDATE_BUSINESS_MUTATION = gql`
  mutation UPDATE_BUSINESS_MUTATION($business: BusinessUpdateInput!) {
    updateBusiness(business: $business) {
      message
    }
  }
`;

const SubmitButton = (props) => {
  const sendNewInfo = async (updateFn, status = 'draft') => {
    const query = await props.client.readQuery({
      query: BUSINESS_QUERY,
      variables: {
        businessId: props.id
      }
    });
    const business = Object.assign({}, query.business);
    const address = Object.assign({}, business.address);
    const coverPhotos = JSON.stringify(business.coverPhotos);
    const businessUnits = JSON.stringify(business.units);
    delete business.address;
    delete business.coverPhotos;
    delete business.units;
    delete business.__typename;
    delete address.id;
    delete address.__typename;
    updateFn({
      variables: {
        business: {
          ...business,
          ...address,
          coverPhotos,
          businessUnits,
          status
        }
      }
    });
  };

  return (
    <Grid container spacing={2} style={{ marginTop: 30 }}>
      <Grid item xs={12} md={3} style={{ paddingRight: 30 }} />
      <Grid item xs={12} sm={9}>
        <Mutation
          mutation={UPDATE_BUSINESS_MUTATION}
          variables={{
            id: props.id
          }}
          // refetchQueries={[{ query: BUSINESS_QUERY, variables: { businessId: props.id } }]}
        >
          {( updateBusiness, {error, loading}) => (
            <>
              <Button
                disabled={loading}
                variant="contained"
                color="primary"
                onClick={() => sendNewInfo(updateBusiness)}
                style={{
                  padding: '10px 50px',
                  fontSize: 16,
                  textTransform: 'none',
                  marginRight: 20,
                }}
              >
                Save Changes
              </Button>
              <Button
                disabled={loading}
                variant="contained"
                color="primary"
                onClick={() => sendNewInfo(updateBusiness, 'public')}
                style={{
                  padding: '10px 50px',
                  fontSize: 16,
                  textTransform: 'none',
                  background: 'linear-gradient(90deg, rgb(141, 64, 65) 0%, rgb(75, 65, 140) 100%)',
                }}
              >
                Submit for Review
              </Button>
            </>
          )}
        </Mutation>
      </Grid>
    </Grid>
  );
};

export default SubmitButton;