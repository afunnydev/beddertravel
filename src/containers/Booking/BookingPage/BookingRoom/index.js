import React from 'react';
import { compose } from 'redux';

import Grid from '@material-ui/core/Grid';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

import PanoramaFishEye from '@material-ui/icons/PanoramaFishEye';
import Add from '@material-ui/icons/Add';
import Remove from '@material-ui/icons/Remove';

import ErrorNetwork from 'components/ErrorNetwork';
import ErrorResult from 'components/ErrorResult';
import StyledButton from 'components/StyledButton';
import MessageResult from 'components/MessageResult';
import MessageError from 'components/MessageError';

import WithUserContext from 'containers/AppContext/context';
import ExampleImage from '../example.jpg';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: '15px 0px',
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
    padding: '7px 35px',
  },
  cover: {
    width: 240,
    height: 320,
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
    width: 500,
    marginBottom: 10,
  },
  eqItem: {
    // display: 'flex',
    minWidth: 250,
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
  },
  numLeft: {
    margin: '15px 0px',
  },
  numRoomsToBook: {
    margin: '0px 20px',
    fontWeight: 'bold',
    fontSize: 22,
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
});

/* eslint-disable react/prefer-stateless-function */
class BookingRoom extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      numRooms: 1,
      numRoomsToBook: 1,
      bookInfoGuests: {},
      bookRoom: false,
      bookInfoGuestsValid: true,
    };
    this.increaseNumRooms = this.increaseNumRooms.bind(this);
    this.decreaseNumRooms = this.decreaseNumRooms.bind(this);
    this.bookRoom = this.bookRoom.bind(this);
  }

  componentDidMount() {
    this.setState({ numRooms: this.props.room.numRooms });
  }

  bookRoom() {
    if (this.isBookingSuccess()) {
      // this.setState({bookRoom: false});
      this.props.clearBooking(this.props.room.id);
      return true;
    }
    if (this.state.bookRoom == true) {
      // console.log('this.props.makeBooking', this.props, this.state);
      if (!this.state.bookInfoGuests[0] || (this.state.bookInfoGuests[0] && this.state.bookInfoGuests[0].length <= 0)) {
        this.setState({ bookInfoGuestsValid: false });
        return false;
      }
      this.setState({ bookInfoGuestsValid: true });

      // this.setState({bookInfoGuestsValid: valid})
      this.props.makeBooking(this.props.room.id, this.state.numRoomsToBook, this.state.bookInfoGuests);
    } else {
      this.setState({ bookRoom: true });
    }
  }

  isBookingSuccess() {
    return (this.props.bookResult
    && this.props.bookResult.has(this.props.room.id)
    && this.props.bookResult.get(this.props.room.id)
    && this.props.bookResult.get(this.props.room.id).result
    && (this.props.bookResult.get(this.props.room.id).result.id
        || Array.isArray(this.props.bookResult.get(this.props.room.id).result))
    );
  }

  increaseNumRooms() {
    if (this.state.numRoomsToBook == this.state.numRooms) {
      return false;
    }
    this.setState({ numRoomsToBook: this.state.numRoomsToBook + 1 });
  }

  decreaseNumRooms() {
    if (this.state.numRoomsToBook == 1) return false;
    this.setState({ numRoomsToBook: this.state.numRoomsToBook - 1 });
  }

  handleSubmit(values) {
    // console.log('values', values)
    return false;
  }

  render() {
    const { classes } = this.props;
    const bookingSuccess = this.isBookingSuccess();
    const bookingSubmitting = this.props.bookSubmitting.get(this.props.room.id) === true;
    // console.log('room props', this.props);
    return (
      <Card className={classes.card}>
        <CardMedia
          // component={Link}
          // to={'/business/'+business.id}
          className={classes.cover}
          image={ExampleImage}
          title="TOtle"
        />
        <CardContent className={classes.content}>

          <div className={classes.details}>

            {/* <div className={classes.baseOn}>Base on <br/> 0 reviews</div> */}
            {/* <div className={classes.score}> */}
            {/* <Paper classes={{root: classes.scoreBox}}>4,8</Paper> */}
            {/* </div> */}

          </div>

          <Typography variant="headline" className={classes.roomName}>RoomName</Typography>
          <Typography variant="subheading" className={classes.roomDescription}>RoomDesc</Typography>

          <div className={classes.eqContainer}>
            <div className={classes.eqItem}>
              <PanoramaFishEye className={classes.roundIcon} />
              {' '}
Free Wi-Fi
            </div>
            <div className={classes.eqItem}>
              <PanoramaFishEye className={classes.roundIcon} />
              {' '}
Free Wi-Fi
            </div>
            <div className={classes.eqItem}>
              <PanoramaFishEye className={classes.roundIcon} />
              {' '}
Free Wi-Fi
            </div>
            <div className={classes.eqItem}>
              <PanoramaFishEye className={classes.roundIcon} />
              {' '}
Free Wi-Fi
            </div>
            <div className={classes.eqItem}>
              <PanoramaFishEye className={classes.roundIcon} />
              {' '}
Free Wi-Fi
            </div>
          </div>

          <Divider />


          {this.state.bookRoom && !bookingSuccess && (
            <React.Fragment>
              <Typography variant="body2" style={{ marginBottom: 7 }}>Arrival - Departure</Typography>
              <Typography variant="body1">
                {this.props.searchFrom.format('MMMM Do YYYY')}
                {' '}
after 2 PM (14:00)
              </Typography>
              <Typography variant="body1">
                {this.props.searchTo.format('MMMM Do YYYY')}
                {' '}
before 11
              </Typography>

              <Typography variant="body2" style={{ marginTop: 7 }}>
Peoples (x
                {this.props.searchNumPeople}
)
              </Typography>
              <div style={{ width: 250 }}>
                {// console.log('this v', this, v, i);
                  // this.setState( prevState => ({
                  //   bookInfoGuests: {
                  //     ...prevState.bookInfoGuests,
                  //     [i]: '',
                  //   }
                  // }))
                  // if(i == 0) {
                  //   this.setState( prevState => ({
                  //     bookInfoGuests: {
                  //       ...prevState.bookInfoGuests,
                  //       [i]: this.props.user.name,
                  //     }
                  //   }))
                  // }
                  [...Array(this.props.searchNumPeople)].map((v, i) => (
                  // return (

                    <TextField
                      key={i}
                      fullWidth
                      // value={i == 0 ? this.props.user.name : ""}
                      error={!this.state.bookInfoGuestsValid && i == 0}
                      label={i == 0 ? 'Enter main guest name' : 'Enter guest name'}
                      // defaultValue={i == 0 ? this.props.user.name : ''}
                      value={this.state.bookInfoGuests[i]}
                      onChange={(evt) => {
                        const val = evt.target.value;
                        this.setState(prevState => ({
                          bookInfoGuests: {
                            ...prevState.bookInfoGuests,
                            [i]: val,
                          },
                        }));
                      }}
                    />
                  // );
                  ))}
              </div>
              <Typography variant="body2" style={{ margin: '7px 0px' }}>Total cost</Typography>
              <Typography variant="body1">$320 - no additional fees</Typography>
              <Typography variant="body2" style={{ margin: '7px 0px' }}>Pay now</Typography>
              <Typography variant="body1">$32</Typography>
              <Typography variant="body2" style={{ margin: '7px 0px' }}>Confirmation</Typography>
              <Typography variant="body1">Note that this place accepts bookings automatically or we would need owner to confirm booking manually </Typography>
            </React.Fragment>
          )}

          <Grid container>
            <Grid item xs={6}>
              <Typography color="primary" variant="subheading" className={classes.numLeft}>Only ? left</Typography>
            </Grid>
            <Grid item xs={6}>
              <div align="right">
                <Typography className={classes.discount} variant="body1">$160</Typography>
                <Typography color="primary" className={classes.price} variant="title">$260</Typography>
              </div>
            </Grid>

            <Grid item xs={12} style={{ padding: 10, textAlign: 'center' }}>

              {!this.state.bookInfoGuestsValid && (
                <MessageError error="Please fill up main guest name, and we should totally populate that from user" />
              )}

              {bookingSuccess && this.props.bookResult.get(this.props.room.id).result.id && (
                <MessageResult message="Booking made successfully" />
                // <Typography variant="subheading">Booking made successfully</Typography>
              )}

              {bookingSuccess
              && Array.isArray(this.props.bookResult.get(this.props.room.id).result) && (
                <MessageResult
                  message={`Booking made successfully for ${this.props.bookResult.get(this.props.room.id).result.length} rooms`}
                />
                // <Typography variant="subheading">Booking made successfully for {this.props.bookResult.get(this.props.room.id).result.length} rooms</Typography>
              )}

              {this.props.bookResult && this.props.bookResult.has(this.props.room.id) && (
                // console.log('sdfsdfsdfdsf!!!111', this.props.bookResult.has(this.props.room.id)),
                // console.log(this.props.bookResult.get(this.props.room.id))
                <ErrorResult result={this.props.bookResult.get(this.props.room.id)} />
              )}

              {this.props.bookError && this.props.bookError.has(this.props.room.id) && (
                <ErrorNetwork error={this.props.bookError.get(this.props.room.id)} />
              )}
            </Grid>

            <Grid item xs={6}>
              <Button onClick={this.decreaseNumRooms} variant="contained" color="primary" className={classes.narrowButton}>
                <Remove className={classes.removeIcon} />
              </Button>
              <span className={classes.numRoomsToBook}>{this.state.numRoomsToBook}</span>
              <Button onClick={this.increaseNumRooms} variant="contained" color="primary" className={classes.narrowButton}>
                <Add className={classes.addIcon} />
              </Button>
            </Grid>
            <Grid item xs={6}>
              <div align="right">
                <StyledButton
                  // component={ this.state.numRoomsToBook > 0 ? Link : Button}
                  // to={this.state.numRoomsToBook > 0 ? "/business/book/"+this.props.room.id+"/"+this.state.numRoomsToBook : null}
                  style={{ width: 200 }}
                  disabled={bookingSubmitting}
                  onClick={this.state.numRoomsToBook > 0 ? this.bookRoom : false}
                >
                  { bookingSuccess ? 'Make new booking' : (this.state.bookRoom ? 'Confirm reservation' : 'Reserve') }
                </StyledButton>
              </div>
            </Grid>
            {/* {bookingSubmitting && ( */}
            {/* <React.Fragment> */}
            {/* <Grid item xs={4}>&nbsp;</Grid> */}
            {/* <Grid item xs={4}> */}
            {/* &nbsp; {bookingSubmitting && (<LinearProgress />)} */}
            {/* </Grid> */}
            {/* <Grid item xs={4}>&nbsp;</Grid> */}
            {/* </React.Fragment> */}
            {/* )} */}
          </Grid>


          {/* <Typography variant="body1">? reservations</Typography> */}
          {/* <Typography variant="body1">? visits</Typography> */}

          {/* <Typography variant="body1" color="secondary" className={classes.gains}>Gains + $32.3</Typography> */}
          {/* <Typography variant="body1" className={classes.commission}>Commission of 20%</Typography> */}

        </CardContent>
      </Card>
    );
  }
}

BookingRoom.propTypes = {};

export default compose(
  withStyles(styles),
  WithUserContext,
  // reduxForm({ form: 'contact' }),
)(BookingRoom);
