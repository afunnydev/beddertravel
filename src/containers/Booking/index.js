import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import ReviewButton from './ReviewButton';
import ShareButton from './ShareButton';

import PageHeader from 'components/PageHeader';
import CoverPhotoSlider from 'components/CoverPhotoSlider';
import SupportTicket from 'components/SupportTicket';
import BusinessGeneralInfo from 'components/BusinessGeneralInfo';
import PaperWithText from 'components/PaperWithText';
import BusinessBadges from 'components/BusinessBadges';

import SearchBar from 'containers/SearchBar/Loadable';

const BOOKING_QUERY = gql`
  query BOOKING_QUERY($bookingId: Int!) {
    booking(bookingId: $bookingId) {
      id
      from
      to
      amount
      business {
        id
        name
        reviewsNum
        reviewsAvg
        howToFind
        address {
          address
        }
        coverPhotos {
          id
          uuid
          url
        }
      }
    }
  }
`;

const Booking = () => {
  const [supportTicketOpen, setSupportTicketOpen] = useState(false);
  const openSupport = () => setSupportTicketOpen(true);
  const closeSupport = () => setSupportTicketOpen(false);

  return (
    <>
      <Helmet>
        <title>Booking</title>
      </Helmet>
      <Query
        query={BOOKING_QUERY}
        variables={{
          bookingId: 7
        }}
      >
        {({ data, error, loading }) => {
          if (error) return <p>Error</p>;
          if (loading) return <p>Loading...</p>;
          if (!data || !data.booking) return <p>No Booking</p>;
          console.log(data);
          const { booking } = data;
          const fromDate = new Date(booking.from);
          const toDate = new Date(booking.to);
          const totalCost = booking.amount / 100;
          const deposit = (totalCost - 1) * 0.15 + 1;
          const payable = totalCost - deposit;
          return (
            <>
              <SupportTicket open={supportTicketOpen} onClose={closeSupport} />
              <Hidden smDown>
                <SearchBar />
              </Hidden>
              <Grid container justify="center">
                <Grid item xs={12} md={10} lg={8}>
                  <PageHeader title="Reservation" />
                  <CoverPhotoSlider
                    openSupport={openSupport}
                    photos={booking.business ? booking.business.coverPhotos : []}
                    roundedCorners={true}
                  />
                  <BusinessGeneralInfo
                    {...booking.business}
                    openSupport={openSupport}
                  />
                  <Grid container style={{ marginTop: 20 }} spacing={2}>
                    <Grid item xs={12} sm={8}>
                      {toDate < Date.now() && <ReviewButton bookingId={booking.id} />}
                      
                      <PaperWithText
                        texts={[
                          {title: 'How to find this accomodation', text: booking.business.howToFind},
                          {title: 'Dates', text: `${fromDate.toDateString()} to ${toDate.toDateString()}`},
                          {title: 'Cost details', text: `Total cost: ${totalCost} USD`},
                          {text: `Deposit: ${deposit.toFixed(2)} USD`},
                          {text: `Payable at the accomodation: ${payable.toFixed(2)} USD`}
                        ]}
                      />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                      <BusinessBadges openSupport={openSupport} small />
                      <ShareButton
                        name={booking.business.name}
                        location={booking.business.address.address}
                        payable={3}
                        to={toDate.toDateString()}
                        from={fromDate.toDateString()}
                      />
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </>
          );
        }}
      </Query>
    </>
  );
};

Booking.propTypes = {

};

export default Booking;
