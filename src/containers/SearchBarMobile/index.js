import React from 'react';
import MUIPlacesAutocomplete, {
  geocodeBySuggestion,
} from 'mui-places-autocomplete';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import { createMuiTheme, withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import PersonIcon from '@material-ui/icons/Person';
import MyLocation from '@material-ui/icons/MyLocation';

import MenuItem from '@material-ui/core/MenuItem';
import Button from '@material-ui/core/Button';

import DatePicker from 'react-datepicker';
import moment from 'moment';

import 'react-datepicker/dist/react-datepicker.css';

import { compose } from 'redux';

import { withConnect as withReduxProps } from './SearchBarMobileRedux';
import SearchBarMobileRedux from './SearchBarMobileRedux/Loadable';
import { withRouter } from 'react-router-dom';
// import { changeLatAction, changeLocationAction, changeLonAction } from '../HomePage/actions';
import {
  changeLatAction,
  changeLocationAction,
  changeLonAction,
} from './SearchBarMobileRedux/actions';
import {
  submitAction,
} from '../HomePage/actions';

import BedderValidator from 'bedder/bedderValidator';

BedderValidator.prepareTextField();
const google = window.google;

const nums = [
  1,
  2,
  3,
  4,
  5,
  6,
  7,
  8,
  9,
  10,
  11,
  12,
  13,
  14,
  15,
  16,
  17,
  18,
  19,
  20,
  21,
  22,
  23,
  24,
  25,
  26,
  27,
  28,
  29,
  30,
  31,
  32,
  33,
];

const styles = theme => ({
  searchPaperWrapper: {
    padding: '17px 15px',
    // height: 80,
  },
  searchPaper: {
    // height: 45,
  },
  searchPaperItem: {
    padding: '8px 10px',
    // height: 45,
    // maxHeight: 45,
  },
  // input: {
  //   width: 40,
  // },
  adornment: {
    marginRight: 5,
  },
  adornmentEnd: {
    // marginRight: 5,
    // minWidth: 'auto',
    cursor: 'pointer',
  },
  gridColumn: {
    padding: '10px 15px',
  },
  gridColumnLeft: {
    padding: '10px 15px',
    paddingRight: 7.5,
  },
  gridColumnRight: {
    padding: '10px 15px',
    paddingLeft: 7.5,
  },
  findButton: {
    minWidth: 'auto',
    background: 'linear-gradient(90deg, #4b418c 0%, #8d4041 100%);',
    color: 'white',
    paddingTop: '13px',
    paddingBottom: '13px',
  },
  renderDiv: {
    maxWidth: 500,
  },
  primaryColor: {
    color: theme.palette.primary.main,
  },
});

export const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#c26c6a',
      main: '#8f3f3f',
      dark: '#5d1219',
      contrastText: '#fff',
    },
    secondary: {
      light: '#7b6ac0',
      main: '#4b3f8f',
      dark: '#191861',
      contrastText: '#fff',
    },
  },
  typography: {
    fontFamily: ['Ubuntu'].join(','),
  },
  rootSelect: {
    paddingLeft: 5,
    margin: 100,
    display: 'block',
  },
});

/* eslint-disable react/prefer-stateless-function */
class SearchBarMobile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      accuracy: null,
      locationError: false,
      toError: false,
      fromError: false,
      momentNow: moment().startOf('day'),
      location: '',
    };
    this.suggestionSelected = this.suggestionSelected.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
    this.getGeolocationF = this.getGeolocationF.bind(this);
    this.getFrom = this.getFrom.bind(this);
    this.getTo = this.getTo.bind(this);
    this.submit = this.submit.bind(this);
    this.dispatchSubmit = this.dispatchSubmit.bind(this);
    // this.vRefs = BedderValidator.makeRefs(BedderValidator.getSearchBarMobile());
  }

  dispatchSubmit() {
    this.props.dispatch(submitAction());
  }

  submit() {

    // if(!BedderValidator.validate(BedderValidator.getSearchBarMobile())) {
    //   return false;
    // }

    // console.log('this.facking.props', this.props)

    if(!this.validate()) {
      return false;
    }

    if(this.props.searchCallback) {
      this.props.searchCallback();
    // } else {
      // console.log('no yeah (((')
    }

    switch(this.props.location.pathname) {
      case "/home":
        this.props.dispatch(submitAction());
        break;
      default:
        this.props.history.push('/home');
        setTimeout(this.dispatchSubmit, 700);
        break;
        // this.props.handleSubmit();
    }

  }


  validate() {
    let isValid = true;

    if(this.props.locationText.length <= 0) {
      this.setState({'locationError': true});
      isValid = false;
    } else {
      this.setState({'locationError': false});
      // isValid = true;
    }

    if(!this.props.from || this.props.from.isBefore(this.state.momentNow)) {
      this.setState({'fromError': true});
      isValid = false;
    } else {
      this.setState({'fromError': false});
      // isValid = true;
    }

    if(!this.props.to || this.props.to.isSameOrBefore(this.props.from)) {
      this.setState({'toError': true});
      isValid = false;
    } else {
      this.setState({'toError': false});
      // isValid = true;
    }

    this.setState({isValid});

    return isValid;
  }


  componentDidUpdate(prevProps, prevState) {
    // console.log('searchBarMobile componentDidUpdate');

    if(prevProps.from != this.props.from ||
       prevProps.to != this.props.to ||
       prevProps.locationText != this.props.locationText) {
      this.validate();
    }

    if (prevState.location != this.state.location) {
      this.props.onChangeLocationByHand(this.state.location);
      this.props.onChangeLat(this.state.latitude);
      this.props.onChangeLon(this.state.longitude);
    }

    if(prevProps.from != this.props.from) {
      // console.log('updated this.props.from', this.props.from)
      if(this.props.from && (this.props.from.isAfter(this.props.to) || this.props.from.isSame(this.props.to))) {
        // console.log('yeah');
        this.props.onChangeToVal(this.props.from.clone().add(3, 'days'));
      }
      // else if (this.props.from.isSame(this.props.to)) {
      //   this.props.onChangeToVal(this.props.from.clone().add(1, 'days'));
      // }
    }
  }

  getFrom(moment) {
    // this.props.onChangeFromVal(moment.format('MM/DD/YYYY'));
    this.props.onChangeFromVal(moment);
  }

  getTo(moment) {
    // this.props.onChangeFromVal(moment.format('MM/DD/YYYY'));
    this.props.onChangeToVal(moment);
  }

  getGeolocationF() {
    navigator.geolocation.getCurrentPosition(this.getGeolocation);
  }

  getGeolocation(location) {
    // navigator.geolocation.getCurrentPosition(function(location) {
    const { latitude, longitude, accuracy } = location.coords;
    this.setState({
      latitude,
      longitude,
      accuracy,
    });

    const geocoder = new google.maps.Geocoder();
    geocoder.geocode(
      {
        location: { lat: latitude, lng: longitude },
      },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            // map.setZoom(11);
            // var marker = new google.maps.Marker({
            //   position: latlng,
            //   map: map
            // });
            // infowindow.setContent(results[0].formatted_address);
            this.setState({ location: results[0].formatted_address });
            // onGeocodeLocation(results[0].formatted_address);
            // console.log('results[0].formatted_address', results[0].formatted_address);
            // infowindow.open(map, marker);
          } else {
            // console.log('No results found');
            // onGeocodeLocation('');
            this.setState({ location: '' });
          }
        } else {
          console.log(`Geocoder failed due to: ${status}`);
        }
      },
    );

    // console.log(location.coords.latitude);
    // console.log(location.coords.longitude);
    // console.log(location.coords.accuracy);
    // });
  }

  suggestionSelected(suggestion) {
    this.props.dispatch(changeLocationAction(suggestion.description));
    geocodeBySuggestion(suggestion)
      .then(results => {
        if (results.length < 1) {
          // this.setState({
          //   errorMessage:
          // console.log(
          //   'Geocode request completed successfully but without any results',
          // );
          // });

          return;
        }

        const { geometry } = results[0];

        this.props.dispatch(changeLatAction(geometry.location.lat()));
        this.props.dispatch(changeLonAction(geometry.location.lng()));

        this.setState({
          lat: geometry.location.lat(),
          lon: geometry.location.lng(),
        });
      })
      .catch(err => {
        console.log('geocode err.message', err.message);
        // this.setState({ errorMessage: err.message });
      });
  }

  // const RenderMUIInput = (input) => (
  //   <Validation
  //     ref={this.vRefs.location}
  //     onChangeCallback="onChange"
  //     validators={[BedderValidator.getValidators().notEmpty]}>
  //     <TextField

  //     />
  //   </Validation>
  // )

  render() {
    const { classes } = this.props;
    const vs = BedderValidator.getValidators();
    // console.log('serach props', this.props);
    // console.log('serach locationError', this.state.locationError);

    return (
      <React.Fragment>
        <SearchBarMobileRedux />
        {/* <Paper className={classes.searchPaperWrapper} square background="none"> */}
          {/* <Paper className={classes.searchPaper} elevation={0}> */}
            <Grid container>
              <Grid item xs={12}>
                <div className={classes.gridColumn}>
                  <Paper className={classes.searchPaperItem}>
                    <MUIPlacesAutocomplete
                      // renderTarget={RenderMUIInput}
                      // error={this.state.locationError}
                      textFieldProps={{
                        fullWidth: true,

                        value: this.props.locationText,
                        id: 'location',
                        onChange: this.props.onChangeLocation,
                        InputProps: {
                          style: this.state.locationError ? {color: 'red'} : {},
                          disableUnderline: true,
                          startAdornment: (
                            <InputAdornment
                              position="start"
                              className={classes.adornment}
                            >
                              {/*<Search /> */}
                              {/*<span className={classes.primaryColor}> */}
                                <span className="icon-search"/>
                              {/*</span> */}
                            </InputAdornment>
                          ),
                          endAdornment: (
                            <InputAdornment
                              // component={IconButton}
                              onClick={this.getGeolocationF}
                              position="end"
                              className={classes.adornmentEnd}
                            >
                              <MyLocation color="primary" />
                            </InputAdornment>
                          ),
                        },
                      }}
                      onSuggestionSelected={this.suggestionSelected}
                      renderTarget={() => <div className={classes.renderDiv} />}
                    />
                  </Paper>
                </div>
              </Grid>
              <Grid item xs={6}>
              <div className={classes.gridColumnLeft}>
                      <Paper className={classes.searchPaperItem}>
                        <DatePicker
                          id="from"
                          // value={this.props.from}
                          // selected={moment()}
                          selected={this.props.from}
                          // selected={(this.props.from != '') ? this.props.from : moment()}
                          fullWidth
                          // error={true}
                          // onChange={this.props.onChangeFrom}
                          onChange={this.getFrom}
                          // onChange={date => console.log('date', date)}
                          customInput={
                            // <Validation
                            //   ref={this.vRefs.from}
                            //   onChangeCallback="onChange"
                            //   validators={[vs.notEmpty]}>
                            <TextField
                              // type="date"

                              fullWidth
                              // onChange={this.props.onChangeFrom}
                              error
                              inputProps={{
                                style: {maxWidth: 130}
                              }}
                              InputProps={{
                                style: this.state.fromError ? {color: 'red'} : {},
                                // error: true,
                                disableUnderline: true,
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.adornment}
                                  >
                                    {/*<FlightTakeoff />*/}
                                    <span className={classes.primaryColor}>
                                      <span className="icon-go"/>
                                    </span>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            // </Validation>
                          }
                        />
                      </Paper>
                    </div>
              </Grid>
              <Grid item xs={6}>
              <div className={classes.gridColumnRight}>
                      <Paper className={classes.searchPaperItem}>
                        <DatePicker
                          id="to"
                          // value={this.props.to}
                          // selected={moment()}
                          selected={this.props.to}
                          // selected={(this.props.from != '') ? this.props.from : moment()}
                          fullWidth
                          // onChange={this.props.onChangeFrom}
                          onChange={this.getTo}
                          // onChange={date => console.log('date', date)}
                          customInput={
                            // <Validation
                            //   ref={this.vRefs.to}
                            //   onChangeCallback="onChange"
                            //   validators={[vs.notEmpty]}>
                            <TextField
                              // type="date"
                              fullWidth
                              // onChange={this.props.onChangeFrom}
                              // error={this.state.errorTo}
                              inputProps={{
                                style: {maxWidth: 130}
                              }}
                              InputProps={{
                                style: this.state.toError ? {color: 'red'} : {},
                                disableUnderline: true,
                                startAdornment: (
                                  <InputAdornment
                                    position="start"
                                    className={classes.adornment}
                                  >
                                    {/*<FlightLand />*/}
                                    <span className={classes.primaryColor}>
                                      <span className="icon-back"/>
                                    </span>
                                  </InputAdornment>
                                ),
                              }}
                            />
                            // </Validation>
                          }
                        />
                      </Paper>
                    </div>
              </Grid>
              {/* <Grid item xs={6}>
                <Grid container>
                  <Grid item xs={6}>

                  </Grid>
                  <Grid item xs={6}>

                  </Grid>
                </Grid>
              </Grid> */}

              <Grid item xs={12}>
                <Grid container>
                  <Grid item xs={6}>
                    <div className={classes.gridColumnLeft}>
                      <Paper className={classes.searchPaperItem}>
                        <TextField
                          id="numPeople"
                          value={this.props.numPeople}
                          select
                          fullWidth
                          // classes={{root: classes.rootSelect}}
                          // className={classes.rootSelect}
                          onChange={this.props.onChangeNumPeople}
                          InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.adornment}
                              >
                                {/*<GroupIcon className={classes.primaryColor} />*/}
                                <PersonIcon className={classes.primaryColor} />
                                {/*<span className={classes.primaryColor}>*/}
                                  {/*<span className="icon-go"/>*/}
                                {/*</span>*/}
                              </InputAdornment>
                            ),
                          }}
                          SelectProps={{
                            // classes: {root: classes.rootSelect},
                            // className: classes.rootSelect,
                            MenuProps: {
                              // className: classes.menu,
                            },
                          }}
                        >
                          {nums.map(option => (
                            <MenuItem
                              key={option}
                              value={option}
                              // selected={option == 1 ? true : false}
                            >
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Paper>
                    </div>
                  </Grid>
                  <Grid item xs={6}>
                    <div className={classes.gridColumnRight}>
                      <Paper className={classes.searchPaperItem}>
                        <TextField
                          id="numBed"
                          value={this.props.numBed}
                          select
                          fullWidth
                          onChange={this.props.onChangeNumBed}
                          InputProps={{
                            disableUnderline: true,
                            startAdornment: (
                              <InputAdornment
                                position="start"
                                className={classes.adornment}
                              >
                                {/*<LocalHotelIcon />*/}
                                <span className={classes.primaryColor}>
                                  <span className="icon-bed"/>
                                </span>
                              </InputAdornment>
                            ),
                          }}
                          SelectProps={{
                            MenuProps: {
                              // className: classes.menu,
                            },
                          }}
                        >
                          {nums.map(option => (
                            <MenuItem key={option} value={option}>
                              {option}
                            </MenuItem>
                          ))}
                        </TextField>
                      </Paper>
                    </div>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                {/*<Typography align="right">*/}
                <div className={classes.gridColumn} align="right">
                  <Typography noWrap>
                    <Button
                      fullWidth
                      onClick={this.submit}
                      // disabled={!this.state.isValid}
                      classes={{
                        root: classes.findButton,
                      }}
                    >
                      Find!
                    </Button>
                  </Typography>
                </div>
                {/*</Typography>*/}
              </Grid>
            </Grid>
          {/* </Paper> */}
        {/* </Paper> */}
      </React.Fragment>
    );
  }
}

SearchBarMobile.propTypes = {};

// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }
//
// const withConnect = connect(
//   null,
//   mapDispatchToProps,
// );

export default compose(
  withStyles(styles),
  withReduxProps,
  withRouter,
)(SearchBarMobile);
