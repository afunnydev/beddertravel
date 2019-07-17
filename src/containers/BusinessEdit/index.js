import React from 'react';
import { Helmet } from 'react-helmet';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';

import Grid from '@material-ui/core/Grid';

import apolloClient from 'utils/createClient';

import BusinessEditPageHeader from './BusinessEditPageHeader.js';
import BusinessEditGeneralInformation from './BusinessEditGeneralInformation.js';
import BusinessEditBedrooms from './BusinessEditBedrooms.js';
import BusinessEditGeneralInformationMore from './BusinessEditGeneralInformationMore.js';
import BusinessNotAvailable from './BusinessNotAvailable.js';
import SubmitButtons from './SubmitButtons.js';

const BUSINESS_QUERY = gql`
  query BUSINESS_QUERY($businessId: Int!) {
    business(businessId: $businessId) {
      id
      status
      name
      mood
      propertyType
      around
      opinionStrong
      opinionWeak
      howToFind
      activities
      amenities
      address {
        id
        lat
        lon
        address
      }
      coverPhotos {
        id
        uuid
        url
      }
      units {
        id
        name
        parentId
        numRooms
        bedsKing
        bedsQueen
        bedsSimple
        numPeople
        equipment
        photos {
          id
          uuid
          url
        }
        rate
        currency
        isDeleted
        isNew
      }
    }
  }
`;

const BusinessEditPage = ({ match }) => (
  <ApolloProvider client={apolloClient}>
    <Helmet>
      <title>Edit Accomodation</title>
    </Helmet>
    <Grid container style={{ padding: '0px 15px' }}>
      <BusinessEditPageHeader />
      <Query
        query={BUSINESS_QUERY}
        variables={{
          businessId: parseInt(match.params.id)
        }}
        returnPartialData={true}
      >
        {({ data, loading, error, client }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading...</p>;
          if (!data || !data.business) return <p>No Business</p>;
          if (data.business.status < 2) return <BusinessNotAvailable />;
          return (
            <>
              <BusinessEditGeneralInformation
                {...data.business}
                client={client}
              />
              <BusinessEditBedrooms 
                id={data.business.id}
                units={data.business.units}
                client={client}
              />
              <BusinessEditGeneralInformationMore
                {...data.business}
                client={client}
              />
              <SubmitButtons 
                id={data.business.id}
                client={client}
                status={data.business.status}
              />
            </>
          );
        }}
      </Query>
    </Grid>
  </ApolloProvider>
);

export default BusinessEditPage;
export { BUSINESS_QUERY };
