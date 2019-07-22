import React from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';

import Grid from '@material-ui/core/Grid';
import BusinessViewRoom from 'components/BusinessViewRoom';

const BUSINESS_QUOTES_QUERY = gql`
  query BUSINESS_QUOTES_QUERY($businessId: Int!, $from: String!, $to: String!, $minPersons: Int!, $numBed: Int!) {
    businessQuotes(businessId: $businessId, from: $from, to: $to, minPersons: $minPersons, numBed: $numBed) {
      id
      name
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
      available
      quote
      deposit
      toPayThere
      acceptAutomatically
    }
  }
`;

const BOOKING_SEARCH_QUERY = gql`
  {
    bookingStartDate @client
    bookingEndDate @client
    bookingNumBeds @client
    bookingNumPeople @client
  }
`;

const Rooms = ({ businessId }) => { 
  return (
    <Grid container justify="center" spacing={3}>
      <Grid item xs={12} md={10} style={{ padding: 20 }}>
        <Query
          query={BOOKING_SEARCH_QUERY}
        >
          {({ data }) => (
            <Query
              query={BUSINESS_QUOTES_QUERY}
              variables={{ 
                businessId,
                from: data.bookingStartDate,
                to: data.bookingEndDate,
                minPersons: parseInt(data.bookingNumPeople),
                numBed: parseInt(data.bookingNumBeds),
              }}
            >
              {({ data, error, loading, client }) => {
                if (error) return <p>Error Loading Rooms</p>;
                if (loading) return <p>Loading Rooms...</p>;
                if (!data || !data.businessQuotes || !data.businessQuotes.length) return <p>No Rooms available</p>;
                return <>
                  {data.businessQuotes.map(businessUnit => {
                    if (businessUnit.available > 0) {
                      return <BusinessViewRoom
                        key={businessUnit.id}
                        client={client}
                        {...businessUnit}
                      />;
                    }
                    return null;
                  })}
                </>;
              }}
            </Query>
          )}
        </Query>
      </Grid>
    </Grid>
  );
};

Rooms.propTypes = {
  businessId: PropTypes.number.isRequired,
};

export default Rooms;
export { BOOKING_SEARCH_QUERY };