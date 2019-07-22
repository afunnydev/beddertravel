import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Helmet } from 'react-helmet';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { withRouter } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';

// import SearchBar from 'containers/SearchBar/Loadable';

import CoverPhotoSlider from './CoverPhotoSlider';
import GeneralInfo from './GeneralInfo';
import GeneralInfoMore from './GeneralInfoMore';
import Rooms from './Rooms';

import SupportTicket from 'components/SupportTicket';

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
  const [supportTicketOpen, setSupportTicketOpen] = useState(false);
  const openSupport = () => setSupportTicketOpen(true);
  const closeSupport = () => setSupportTicketOpen(false);

  return (
    <>
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
              <SupportTicket open={supportTicketOpen} onClose={closeSupport} />
              <CoverPhotoSlider 
                photos={data.business.coverPhotos} 
                openSupport={openSupport} 
              />
              <GeneralInfo 
                {...data.business} 
                openSupport={openSupport}
              />
              <Rooms businessId={data.business.id} />
              <GeneralInfoMore 
                {...data.business} 
                openSupport={openSupport}
              />
            </>;
          }}
        </Query>
      </Grid>
    </>
  );
};

BusinessView.propTypes = {
  match: PropTypes.object.isRequired,
};

export default withRouter(BusinessView);
