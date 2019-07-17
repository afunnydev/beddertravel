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

import 'react-datepicker/dist/react-datepicker.css';

import { compose } from 'redux';

import { withConnect as withReduxProps } from './SearchBarMobileRedux';
import SearchBarMobileRedux from './SearchBarMobileRedux/Loadable';
import { withRouter } from 'react-router-dom';
import {
  changeLatAction,
  changeLocationAction,
  changeLonAction,
} from './SearchBarMobileRedux/actions';
import {
  submitAction,
} from '../HomePage/actions';

import BedderValidator from 'bedder/bedderValidator';

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

let momentNow = new Date();
momentNow.setHours(0,0,0,0);

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
    if(!this.validate()) {
      return false;
    }

    if(this.props.searchCallback) {
      this.props.searchCallback();
    }

    switch(this.props.location.pathname) {
      case "/home":
        this.props.dispatch(submitAction());
        break;
      default:
        this.props.history.push('/home');
        setTimeout(this.dispatchSubmit, 700);
        break;
    }
  }

  validate() {
    let isValid = true;

    if(this.props.locationText.length <= 0) {
      this.setState({'locationError': true});
      isValid = false;
    } else {
      this.setState({'locationError': false});
    }

    if(!this.props.from || this.props.from < momentNow) {
      this.setState({'fromError': true});
      isValid = false;
    } else {
      this.setState({'fromError': false});
    }

    if(!this.props.to || this.props.to <= this.props.from) {
      this.setState({'toError': true});
      isValid = false;
    } else {
      this.setState({'toError': false});
    }

    this.setState({isValid});

    return isValid;
  }


  componentDidUpdate(prevProps, prevState) {
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
      if(this.props.from && (this.props.from >= this.props.to)) {
        const newDate = this.props.from.addDays(3);
        this.props.onChangeToVal(newDate);
      }
    }
  }

  getFrom = (date) => this.props.onChangeFromVal(date);
  getTo = (date) => this.props.onChangeToVal(date);

  getGeolocationF() {
    navigator.geolocation.getCurrentPosition(this.getGeolocation);
  }

  getGeolocation(location) {
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
            this.setState({ location: results[0].formatted_address });
          } else {
            this.setState({ location: '' });
          }
        } else {
          console.log(`Geocoder failed due to: ${status}`);
        }
      },
    );
  }

  suggestionSelected(suggestion) {
    this.props.dispatch(changeLocationAction(suggestion.description));
    geocodeBySuggestion(suggestion)
      .then(results => {
        if (results.length < 1) {
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
      });
  }

  render() {
    const { classes } = this.props;

    return (
      <React.Fragment>
        <SearchBarMobileRedux />
        <Grid container>
          <Grid item xs={12}>
            <div className={classes.gridColumn}>
              <Paper className={classes.searchPaperItem}>
                <MUIPlacesAutocomplete
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
                          <span className="icon-search"/>
                        </InputAdornment>
                      ),
                      endAdornment: (
                        <InputAdornment
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
                  selected={this.props.from}
                  fullWidth
                  onChange={this.getFrom}
                  customInput={
                    <TextField
                      fullWidth
                      error
                      inputProps={{
                        style: {maxWidth: 130}
                      }}
                      InputProps={{
                        style: this.state.fromError ? {color: 'red'} : {},
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
                  selected={this.props.to}
                  fullWidth
                  onChange={this.getTo}
                  customInput={
                    <TextField
                      fullWidth
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
                            <span className={classes.primaryColor}>
                              <span className="icon-back"/>
                            </span>
                          </InputAdornment>
                        ),
                      }}
                    />
                  }
                />
              </Paper>
            </div>
          </Grid>

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
                      onChange={this.props.onChangeNumPeople}
                      InputProps={{
                        disableUnderline: true,
                        startAdornment: (
                          <InputAdornment
                            position="start"
                            className={classes.adornment}
                          >
                            <PersonIcon className={classes.primaryColor} />
                          </InputAdornment>
                        ),
                      }}
                    >
                      {nums.map(option => (
                        <MenuItem
                          key={option}
                          value={option}
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
            <div className={classes.gridColumn} align="right">
              <Typography noWrap>
                <Button
                  fullWidth
                  onClick={this.submit}
                  classes={{
                    root: classes.findButton,
                  }}
                >
                  Find!
                </Button>
              </Typography>
            </div>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

SearchBarMobile.propTypes = {};

export default compose(
  withStyles(styles),
  withReduxProps,
  withRouter,
)(SearchBarMobile);
