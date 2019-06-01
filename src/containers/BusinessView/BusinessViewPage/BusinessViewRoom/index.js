/**
 *
 * BusinessViewRoom
 *
 */

import React from 'react';
import { compose } from 'redux';
import { withRouter } from 'react-router';
import Bedder from 'bedder/bedder';
import { withSnackbar } from 'notistack';
import StripeCheckout from 'react-stripe-checkout';

import ErrorNetwork from 'components/ErrorNetwork';
import ErrorResult from 'components/ErrorResult';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CardMedia from '@material-ui/core/CardMedia';
import { Button } from '@material-ui/core';

import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';

import PanoramaFishEye from '@material-ui/icons/PanoramaFishEye';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

import StyledButton from 'components/StyledButton';
import MessageResult from 'components/MessageResult';
import MessageError from 'components/MessageError';

import WithUserContext from 'containers/AppContext/context';
import BedderLoadingIndicator from 'components/BedderLoadingIndicator';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: '15px 0px',
  },
  cardMobile: {
    display: 'flex',
    margin: '15px 0px',
    flexDirection: 'column',
  },
  details: {
    display: 'flex',
    justifyContent: 'flex-start',
    // flexDirection: 'column',
  },
  baseOn: {
    width: 90,
    fontSize: 12,
    // marginRight: 10,
    padding: '4px 10px',
    // textAlign: 'right',
  },
  score: {
    // width: 45,
  },
  scoreBox: {
    // height: 35,
    padding: '7px 10px',
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
  },
  content: {
    flex: '1',
    // textAlign: 'right',
    padding: '24px 35px !important',
  },
  contentMobile: {
    flex: '1',
    // textAlign: 'right',
    padding: '11px 15px !important',
  },
  cover: {
    width: 240,
    // height: 320,
  },
  coverMobile: {
    width: '100%',
    minHeight: 200,
    // height: 320,
  },
  title: {
    margin: '8px 0px',
  },
  gains: {
    fontWeight: 700,
    marginTop: 15,
  },
  commission: {
    textDecoration: 'underline',
    fontStyle: 'italic',
    fontSize: 12,
  },
  roomDescription: {
    fontStyle: 'italic',
    margin: '10px 0px',
    marginTop: 7,
  },
  eqContainer: {
    display: 'flex',
    flexWrap: 'wrap',
    alignContent: 'flex-start',
    maxWidth: 500,
    width: '100%',
    marginBottom: 10,
  },
  eqItem: {
    // display: 'flex',
    minWidth: 230,
    // margin: 'auto',
  },
  roomName: {
    // marginBottom: 10,
  },
  roundIcon: {
    fontSize: '14pt',
    marginBottom: 4,
    marginRight: 4,
    color: theme.palette.secondary.main,
  },
  discount: {
    textDecoration: 'line-through',
    color: theme.palette.grey[600],
    margin: '3px 0px',
  },
  price: {
    fontWeight: 'bold',
    marginTop: 20,
  },
  numLeft: {
    margin: '15px 0px',
  },
  numRoomsToBook: {
    margin: '0px 15px',
    fontWeight: 'bold',
    fontSize: 20,
  },
  narrowButton: {
    minWidth: 'auto',
  },
  removeIcon: {
    fontSize: 10,
  },
  addIcon: {
    fontSize: 26,
  },
  closeButton: {
    position: 'absolute',
    right: theme.spacing(1),
    top: theme.spacing(1),
    color: theme.palette.grey[500],
  }
});

/* eslint-disable react/prefer-stateless-function */
class BusinessViewRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numRooms: 1,
      numRoomsAvailable: 1,
      numRoomsToBook: 1,
      bookInfoGuests: {},
      bookRoom: false,
      bookInfoGuestsValid: true,
      bookingDialogOpen: false,
    };
    this.increaseNumRooms = this.increaseNumRooms.bind(this);
    this.decreaseNumRooms = this.decreaseNumRooms.bind(this);
    this.bookRoom = this.bookRoom.bind(this);
  }

  componentDidMount() {
    // this.setState({numRooms: this.props.room.numRooms});
    this.setState({
      numRooms: this.props.getResultModel.quotes.available[this.props.room.id],
    });
  }

  bookRoom = () => {
    if (Bedder.notUser()) {
      if (Bedder.notUser()) {
        Bedder.onlyForUser(this.props.lh);
        return false;
      }
    }

    if (this.isBookingSuccess()) {
      // this.setState({bookRoom: false});
      this.props.clearBooking(this.props.room.id);
      return true;
    }
    if (this.state.bookRoom == true) {
      // if (
      //   !this.state.bookInfoGuests[0] ||
      //   (this.state.bookInfoGuests[0] &&
      //     this.state.bookInfoGuests[0].length <= 0)
      // ) {
      //   this.setState({ bookInfoGuestsValid: false });
      //   return false;
      // }
      // this.setState({ bookInfoGuestsValid: true });

      // this.setState({bookInfoGuestsValid: valid})
      this.props.makeBooking(
        this.props.room.id,
        this.state.numRoomsToBook,
        { 1: 'Anonymous' },
      );
    }
  }

  isBookingSuccess = () => {
    if (
      this.props.bookResult &&
      this.props.bookResult.has(this.props.room.id) &&
      this.props.bookResult.get(this.props.room.id) &&
      this.props.bookResult.get(this.props.room.id).result &&
      (this.props.bookResult.get(this.props.room.id).result.id ||
        Array.isArray(this.props.bookResult.get(this.props.room.id).result))
    ) {
      this.props.enqueueSnackbar('Reservation successfull. Enjoy your stay 🛌!', { variant: 'success' });
      this.props.history.push('/bookings');
      this.props.clearBooking();
      return true;
    }
    return false;
  }

  increaseNumRooms = () => {
    if (this.state.numRoomsToBook == this.state.numRooms) {
      return false;
    }
    return this.setState({ numRoomsToBook: this.state.numRoomsToBook + 1 });
  }

  decreaseNumRooms = () => {
    if (this.state.numRoomsToBook == 1) return false;
    return this.setState({ numRoomsToBook: this.state.numRoomsToBook - 1 });
  }

  handleSubmit = values => {
    // console.log('values', values)
    return false;
  }

  handleClose = () => {
    this.setState({ bookingDialogOpen: false, bookRoom: false });
  };

  onToken = (res) => {
    console.log("STRIPE");
    this.props.makeBooking(
      this.props.room.id,
      this.state.numRoomsToBook,
      { 1: 'Anonymous' },
      res.id
    );
  }

  render() {
    const { classes, room } = this.props;
    const bookingSuccess = this.isBookingSuccess();
    const bookingSubmitting =
      this.props.bookSubmitting.get(this.props.room.id) === true;
    const res = this.props.getResultModel;
    const days = res.days;
    // const isMobile = this.props.width == 'xs' || this.props.width == 'sm';
    const isXS = this.props.width == 'xs';
    const isSM = this.props.width == 'sm';
    const isMobile = this.props.width == 'xs' || this.props.width == 'sm';

    const discount = res.quotes[room.id].discount;
    const finalPrice = discount * this.state.numRoomsToBook;
    const finalPriceRounded = finalPrice.toFixed(2);
    const finalDeposit = discount * this.state.numRoomsToBook * 0.15;
    const finalDepositRounded = finalDeposit.toFixed(2);
    const user = Bedder.getUser();

    return (
      <Card className={isXS ? classes.cardMobile : classes.card}>
        <CardMedia
          className={isXS ? classes.coverMobile : classes.cover}
          image={
            room.files && room.files.length > 0 ? room.files[0].data : null
          }
          title={room.name}
        />

        <CardContent
          className={isMobile ? classes.contentMobile : classes.content}
        >
          <Typography variant="h5" className={classes.roomName}>
            {room.name}
          </Typography>
          <Typography variant="subtitle1" className={classes.roomDescription}>
            {room.description}
          </Typography>

          <div className={classes.eqContainer}>
            {/* <Amenities change={(id) => {console.log('pressed', id)}} amenities={fromJS(room.equipment)} onlyTrue onlyText /> */}
            {room.equipment &&
              Object.keys(room.equipment).map((v, i) => {
                const vSplitJoin = v.split('_').join(' ');
                const vv =
                  vSplitJoin.charAt(0).toUpperCase() + vSplitJoin.substr(1);
                return (
                  <div className={classes.eqItem} key={i}>
                    <PanoramaFishEye className={classes.roundIcon} /> {vv}
                  </div>
                );
              })}
          </div>

          <Divider />

          <Grid container>
            <Grid item xs={8}>
              &nbsp;
            </Grid>
            <Grid item xs={12} md={4} style={{ marginBottom: 20 }}>
              <React.Fragment>
                <Typography
                  align="center"
                  color="primary"
                  className={classes.price}
                  variant="subtitle1"
                >
                  {finalPriceRounded} USD
                </Typography>
                <Typography align="center">
                  For {days} night{days > 1 ? 's' : ''}
                </Typography>
              </React.Fragment>
            </Grid>

            <Grid item xs={12} md={5} align={isMobile ? 'center' : ''}>
              <Button
                onClick={this.decreaseNumRooms}
                variant="contained"
                color="primary"
                className={classes.narrowButton}
              >
                <Remove className={classes.removeIcon} />
              </Button>
              <span className={classes.numRoomsToBook}>
                {this.state.numRoomsToBook}
              </span>
              <Button
                onClick={this.increaseNumRooms}
                variant="contained"
                color="primary"
                className={classes.narrowButton}
                disabled={this.state.numRoomsToBook === this.state.numRooms}
              >
                <Add className={classes.addIcon} />
              </Button>
            </Grid>
            <Grid item xs={12} md={7}>
              <div align={isMobile ? 'center' : 'right'}>
                <StyledButton
                  // component={ this.state.numRoomsToBook > 0 ? Link : Button}
                  // to={this.state.numRoomsToBook > 0 ? "/business/book/"+this.props.room.id+"/"+this.state.numRoomsToBook : null}
                  style={{
                    width: isMobile ? (isSM ? 300 : '100%') : 200,
                    marginTop: isMobile ? 10 : 0,
                  }}
                  disabled={bookingSubmitting}
                  // onClick={this.state.numRoomsToBook > 0 ? this.bookRoom : false}
                  onClick={() => {
                    if (this.state.numRoomsToBook > 0) {
                      this.setState({ bookingDialogOpen: true, bookRoom: true, });
                    }
                  }}
                >
                  {bookingSuccess
                    ? 'Make new booking'
                    : `Reserve ${this.state.numRoomsToBook} room${this.state.numRoomsToBook > 1 ? 's' : ''} `}
                </StyledButton>
              </div>
            </Grid>
          </Grid>

          <Dialog
            fullWidth
            maxWidth="md"
            open={this.state.bookingDialogOpen}
            onClose={this.handleClose}
            aria-labelledby="max-width-dialog-title"
          >
            <DialogTitle id="max-width-dialog-title">
              Reservation Request
              <IconButton 
                aria-label="Close" 
                className={classes.closeButton} 
                onClick={this.handleClose}>
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" style={{ marginBottom: 7 }}>
                    Date
                  </Typography>
                  <Typography variant="body1">
                    {this.props.searchFrom.toLocaleDateString()} to {this.props.searchTo.toLocaleDateString()}
                  </Typography>
                  <Typography variant="body2" style={{ marginTop: 7 }}>
                    This reservation is for {this.props.searchNumPeople} person{this.props.searchNumPeople > 1 ? 's' : ''}.
                  </Typography>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="body2" style={{ margin: '7px 0px' }}>
                    Total cost of the reservation
                  </Typography>
                  <Typography variant="body1">
                    {finalPriceRounded} USD for {days} night{days > 1 ? 's' : ''}
                  </Typography>
                  <Typography variant="body2" style={{ margin: '7px 0px' }}>
                    Total to pay now
                  </Typography>
                  <Typography variant="body1">
                    {finalDepositRounded} USD
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="body2" style={{ margin: '7px 0px' }}>
                    Confirmation
                  </Typography>
                  <Typography variant="body1">
                    Note that this accomodation {this.props.room.acceptAutomatically === 1 ? 
                      'accepts bookings automatically. In case anything would change, you will be contacted by email.' :
                      'doesn\'t accept booking automatically. Once the reservation request is made, we will follow up with you quickly to let you know the status.'}
                  </Typography>
                </Grid>
                <Grid item xs={12} style={{ padding: 10, textAlign: 'center' }}>

                  {bookingSuccess &&
                    this.props.bookResult.get(this.props.room.id).result.id && (
                    <MessageResult message="Booking made successfully" />
                  )}

                  {bookingSuccess &&
                    Array.isArray(
                      this.props.bookResult.get(this.props.room.id).result,
                    ) && (
                      <MessageResult
                        message={
                          `Booking made successfully for ${ 
                          this.props.bookResult.get(this.props.room.id).result
                            .length 
                          } rooms`
                        }
                      />
                  )}

                  {this.props.bookResult &&
                    this.props.bookResult.has(this.props.room.id) && (
                      <ErrorResult
                        result={this.props.bookResult.get(this.props.room.id)}
                      />
                  )}

                  {this.props.bookError &&
                    this.props.bookError.has(this.props.room.id) && (
                      <ErrorNetwork
                        error={this.props.bookError.get(this.props.room.id)}
                      />
                  )}
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <StripeCheckout
                amount={finalDepositRounded * 100}
                stripeKey="pk_test_EFeA2DzhJpMgBvupgzZFd0Nl00Kz5vVuyA"
                email={user && user.email}
                token={stripeRes => this.onToken(stripeRes)}
                image={room.files && room.files.length && room.files[0].data}
                name={room.name}
                description="Bedder Travel"
                // billingAddress={true}
                // zipCode={true}
              >
                {!bookingSuccess && <StyledButton
                  style={{
                    width: isMobile ? (isSM ? 300 : '100%') : 200,
                    marginTop: isMobile ? 10 : 0,
                  }}
                  disabled={bookingSubmitting || bookingSuccess}
                  // onClick={this.state.numRoomsToBook > 0 ? this.bookRoom : false}
                >
                    {bookingSubmitting
                      ? <BedderLoadingIndicator white size={20} />
                      : `Reserve ${this.state.numRoomsToBook} room${this.state.numRoomsToBook > 1 ? 's' : ''} now`}
                </StyledButton>}
              </StripeCheckout>
            </DialogActions>
          </Dialog>
        </CardContent>
      </Card>
    );
  }
}

BusinessViewRoom.propTypes = {};

export default compose(
  withStyles(styles),
  WithUserContext,
  withRouter,
  withSnackbar,
  // reduxForm({ form: 'contact' }),
)(BusinessViewRoom);
