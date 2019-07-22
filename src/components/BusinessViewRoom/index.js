import React, { useState } from 'react';
import PropTypes from 'prop-types';
import gql from 'graphql-tag';
import AliceCarousel from 'react-alice-carousel';
import 'react-alice-carousel/lib/alice-carousel.css';

import { withStyles } from '@material-ui/core/styles';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import Button from '@material-ui/core/Button';

import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

import DefaultImage from 'assets/images/bedder-default-bg.png';
import StyledButton from 'components/styles/StyledButton';
import BookingDialog from 'components/BookingDialog';

import businessViewRoomStyles from './businessViewRoomStyles';

const BUSINESS_UNIT_TO_BOOK_MUTATION = gql`
  mutation BUSINESS_UNIT_TO_BOOK_MUTATION($businessUnitId: Int!) {
    businessUnitToBook(businessUnitId: $businessUnitId) @client(always: true) {
      message
    }
  }
`;

const BusinessViewRoom = ({ classes, id, name, photos, available, quote, deposit, toPayThere, acceptAutomatically, currency, client }) => {
  const [numRoomsToBook, setNumRoomsToBook] = useState(0);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOnDragStart = e => e.preventDefault();
  const matches = useMediaQuery('(max-width: 600px)');
  if (available === 0) return null;
  return (
    <>
      <BookingDialog 
        open={dialogOpen} 
        setDialogOpen={setDialogOpen}
        quote={quote * numRoomsToBook}
        deposit={deposit * numRoomsToBook}
        toPayThere={toPayThere * numRoomsToBook}
        acceptAutomatically={acceptAutomatically}
        currency={currency}
      />
      <Card className={`${classes.card} ${matches ? classes.cardMobile : ''}`}>
        {photos && photos.length
          ? <div className={`${classes.dotsOn} ${matches ? classes.coverMobile : classes.cover}`}><AliceCarousel
            buttonsDisabled 
            mouseDragEnabled
          >
            {photos.map(photo => (
              // Here, we use the photo URL directly. However, with Uploadcare, we could make usage of their resize feature better and serve an image of the browser's size.
              <img key={photo.uuid} src={matches ? `https://ucarecdn.com/${photo.uuid}/-/scale_crop/600x300/center/` : `https://ucarecdn.com/${photo.uuid}/-/scale_crop/340x400/center/`} onDragStart={handleOnDragStart} className={classes.photo} />
            ))}
          </AliceCarousel></div>
          : <CardMedia
            className={matches ? classes.coverMobile : classes.cover}
            image={DefaultImage}
            title={name}
          />}

        <CardContent
          className={matches ? classes.contentMobile : classes.content}
        >
          <Grid container alignContent="space-between" classes={{ root: classes.cardContainer }}>
            <Grid item xs={12} style={{ width: '100%' }}>
              <Typography variant="h5" classes={{ root: classes.roomName }}>
                {name}
              </Typography>
            </Grid>
            <Grid item xs={12} style={{ width: '100%' }}>
              <Divider classes={{ root: classes.divider }} />
              <Grid container spacing={4}>
                <Grid item xs={6}>
                  <Typography
                    align="left"
                    color="primary"
                    variant="body1"
                    classes={{ root: classes.available }}
                  >
                    Only {available} left
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography
                    align="right"
                    color="primary"
                    classes={{ root: classes.price }}
                    variant="body1"
                  >
                    {quote / 100} USD
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Button
                    onClick={() => numRoomsToBook > 0 ? setNumRoomsToBook(numRoomsToBook - 1) : false}
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.leftButton }}
                    disabled={numRoomsToBook <= 0}
                  >
                    <Remove />
                  </Button>
                  <span className={classes.nbOfRooms}>
                    {numRoomsToBook}
                  </span>
                  <Button
                    onClick={() => numRoomsToBook < available ? setNumRoomsToBook(numRoomsToBook + 1) : false}
                    variant="contained"
                    color="primary"
                    classes={{ root: classes.rightButton }}
                    disabled={numRoomsToBook >= available}
                  >
                    <Add />
                  </Button>
                </Grid>
                <Grid item xs={6} style={{ textAlign: 'right' }}>
                  <StyledButton
                    disabled={numRoomsToBook <= 0}
                    onClick={async () => {
                      client.writeData({ data: { numRoomsToBook } });
                      await client.mutate({
                        mutation: BUSINESS_UNIT_TO_BOOK_MUTATION,
                        variables: {
                          businessUnitId: id,
                        }
                      });
                      setDialogOpen(true);
                    }}
                  >
                    {numRoomsToBook <= 0
                      ? 'Add a room'
                      : `Book ${numRoomsToBook} room${numRoomsToBook > 1 ? 's' : ''}`
                    }
                  </StyledButton>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </>
  );
};

BusinessViewRoom.propTypes = {
  id: PropTypes.number.isRequired,
  classes: PropTypes.object.isRequired,
  name: PropTypes.string.isRequired,
  photos: PropTypes.array.isRequired,
  available: PropTypes.number.isRequired,
  quote: PropTypes.number.isRequired,
  deposit: PropTypes.number.isRequired,
  toPayThere: PropTypes.number.isRequired,
  acceptAutomatically: PropTypes.number.isRequired,
  currency: PropTypes.string.isRequired,
  client: PropTypes.object.isRequired,
};

export default withStyles(businessViewRoomStyles)(BusinessViewRoom);
