import React from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { ApolloProvider, Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

import apolloClient from 'utils/createClient';

// import SearchBar from 'containers/SearchBar/Loadable';

import CoverPhotoSlider from './CoverPhotoSlider';
import GeneralInfo from './GeneralInfo';
import GeneralInfoMore from './GeneralInfoMore';
import Rooms from './Rooms';

// import SupportTicket from 'components/SupportTicket/Loadable';
// import AskQuestion from 'components/AskQuestion/Loadable';

const BUSINESS_VIEW_QUERY = gql`
  query BUSINESS_VIEW_QUERY($businessId: Int!) {
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
      reviewsNum
      reviewsAvg
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
    }
  }
`;

const BusinessView = ({ match }) => {
  return (
    <ApolloProvider client={apolloClient}>
      <Helmet>
        <title>Edit Accomodation</title>
      </Helmet>
      <Grid container>
        <Query
          query={BUSINESS_VIEW_QUERY}
          variables={{
            businessId: parseInt(match.params.id)
          }}
          returnPartialData={true}
        >
          {({ data, loading, error }) => {
            if (error) return <p>Error</p>;
            if (loading) return <p>Loading...</p>;
            if (!data || !data.business) return <p>No Business</p>;
            return <>
              {/* <div><SearchBar /></div> */}
              <CoverPhotoSlider photos={data.business.coverPhotos} />
              <GeneralInfo {...data.business} />
              <Rooms businessId={data.business.id} />
              <GeneralInfoMore {...data.business} />
            </>;
          }}
        </Query>
      </Grid>
    </ApolloProvider>
  );
};

BusinessView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(BusinessView);
