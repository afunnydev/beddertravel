import React from 'react';
import PropTypes from 'prop-types';
import MUIPlacesAutocomplete, { geocodeBySuggestion } from 'mui-places-autocomplete';
import { Validation } from 'react-validation-framework';

import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormHelperText from '@material-ui/core/FormHelperText';

import MyLocation from '@material-ui/icons/MyLocation';

import ShrinkedInputLabel from 'components/styles/ShrinkedInputLabel';

import BedderValidator from 'bedder/bedderValidator';
import BedderConfig from 'bedder/bedderConfig';
import calculateProgress from 'utils/calculateProgress';

import {
  changeLocationAction,
  changeLocationLatAction,
  changeLocationLngAction,
} from '../BusinessEditGeneralInformationRedux/actions';
import { withConnect } from '../BusinessEditGeneralInformationRedux';
import BusinessEditGeneralInformationRedux from '../BusinessEditGeneralInformationRedux/Loadable';
import Amenities from './Amenities';
import Map from './Map';
import ProgressTitle from '../ProgressTitle';

BedderValidator.prepareTextField();
const propertyTypes = BedderConfig.getFilterPropertyTypes();
const propertyMoods = BedderConfig.getPropertyMoods();
const google = window.google;

export class BusinessEditGeneralInformation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      latitude: null,
      longitude: null,
      accuracy: null,
      locationError: false,
      location: '',
      locF: false,
      activeMapLocation: {lat: 0, lng: 0},
    };

    this.changePinLocationOnMap = this.changePinLocationOnMap.bind(this);
    this.mapApply = this.mapApply.bind(this);
    this.mapClick = this.mapClick.bind(this);
    this.getGeolocationF = this.getGeolocationF.bind(this);
    this.getGeolocation = this.getGeolocation.bind(this);
    this.suggestionSelected = this.suggestionSelected.bind(this);
  }

  mapClick(evt) {
    this.props.dispatch(changeLocationLatAction(evt.latLng.lat()));
    this.props.dispatch(changeLocationLngAction(evt.latLng.lng()));
  }

  changePinLocationOnMap(location) {
    this.props.dispatch(changeLocationAction(location));
  }

  getGeolocationF() {
    this.setState({ locF: true });
    navigator.geolocation.getCurrentPosition(this.getGeolocation, this.getGeolocationErr);
  }

  getGeolocationErr() {
    this.setState({ locF: false });
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
            const { geometry, formatted_address } = results[0];

            this.changePinLocationOnMap(formatted_address);
            this.props.dispatch(changeLocationLatAction(geometry.location.lat()));
            this.props.dispatch(changeLocationLngAction(geometry.location.lng()));

            this.setState({
              locF: false,
            });
          } else {
            this.setState({ location: '', locF: false });
          }
        } else {
          this.setState({ locF: false });
        }
      },
    );
  }

  suggestionSelected(suggestion) {
    this.props.dispatch(changeLocationAction(suggestion.description));
    geocodeBySuggestion(suggestion)
      .then((results) => {
        if (results.length < 1) {
          return false;
        }

        const { geometry, formatted_address } = results[0];

        this.changePinLocationOnMap(formatted_address);
        this.props.dispatch(changeLocationLatAction(geometry.location.lat()));
        this.props.dispatch(changeLocationLngAction(geometry.location.lng()));

        return this.setState({
          lat: geometry.location.lat(),
          lon: geometry.location.lng(),
        });
      })
      .catch(err => console.log('Geocode error message: ', err.message));
  }

  mapApply() {
    this.setState({ locF: true });
    const geocoder = new google.maps.Geocoder();

    geocoder.geocode(
      {
        location: { lat: this.props.locationLat, lng: this.props.locationLng },
      },
      (results, status) => {
        if (status === 'OK') {
          if (results[0]) {
            this.setState({ locF: false });

            const { geometry, formatted_address } = results[0];

            this.changePinLocationOnMap(formatted_address);
            this.props.dispatch(changeLocationLatAction(geometry.location.lat()));
            this.props.dispatch(changeLocationLngAction(geometry.location.lng()));
          } else {
            // console.log('No results found');
            this.setState({ locF: false });
          }
        } else {
          this.setState({ locF: false });
          console.log(`Geocoder failed due to: ${status}`);
        }
      },
    );
  }

  render() {
    const locationObj = {
      lat: Number(this.props.locationLat) || 50.038350,
      lng: Number(this.props.locationLng) || 14.437180,
    };

    const vs = BedderValidator.getValidators();
    const progress = calculateProgress([this.props.name, this.props.mood, this.props.propertyType, this.props.location]);

    return (
      <React.Fragment>
        <BusinessEditGeneralInformationRedux
          modelResult={this.props.modelResult}
        />

        <Grid item xs={12} md={3} style={this.props.isMobile ? {} : { paddingRight: 30 }}>
          <ProgressTitle text="General information" progress={progress} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
              <Validation
                componentTag="TextField"
                closures={{ name: this.props.name }}
                ref={this.props.vRefs.name}
                onChangeCallback="onChange"
                validators={[vs.notEmpty]}
              >
                <TextField
                  fullWidth
                  id="name"
                  label="Name of this accomodation*"
                  value={this.props.name}
                  onChange={this.props.onChangeName}
                  InputLabelProps={{
                    shrink: true,
                  }}
                />
              </Validation>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                id="mood"
                label="Mood of this accomodation"
                value={this.props.mood || propertyMoods[0].id}
                onChange={this.props.onChangeMood}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {propertyMoods.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>

            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                select
                id="propertyType"
                label="Type of this accomodation"
                value={this.props.propertyType || propertyTypes[0].id}
                onChange={this.props.onChangePropertyType}
                InputLabelProps={{
                  shrink: true,
                }}
              >
                {propertyTypes.map(option => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.value}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
          </Grid>

          <Grid container spacing={2}>
            <Grid item xs={12}>
              <div style={{ marginBottom: 10, marginTop: 10 }}>
                <ShrinkedInputLabel>On-site amenities</ShrinkedInputLabel>
              </div>
              <Amenities changeFn={this.props.onChangeAmenities} amenities={this.props.amenities} />
            </Grid>
            
            <Grid item xs={12} sm={8} style={{ position: 'relative', marginTop: 30, marginBottom: 20 }}>
              <MUIPlacesAutocomplete
                textFieldProps={{
                  fullWidth: true,
                  value: this.props.location || "",
                  placeholder: 'Street, number, city, country...',
                  id: 'location',
                  error: this.props.validationErrors.location,
                  onChange: this.props.onChangeLocation,
                  label: 'Address of this accomodation*',
                  helperText: 'You can use the geolocation button on the right, or see the map below to select a position directly if you can\'t find the correct address.',
                  InputLabelProps: {
                    shrink: true,
                  },
                  InputProps: {
                    style: this.state.locationError ? { color: 'red' } : {},
                    endAdornment: (
                      <InputAdornment
                        onClick={this.getGeolocationF}
                        position="end"
                        style={{ cursor: 'pointer' }}
                      >
                        {this.state.locF || (<MyLocation color="primary" />)}
                        {this.state.locF && (<CircularProgress color="primary" size={24} />)}
                      </InputAdornment>
                    ),
                  },
                }}
                onSuggestionSelected={this.suggestionSelected}
                renderTarget={() => <div style={{ maxWidth: 500 }} />}
              />
            </Grid>

            <Grid item xs={12} style={{ position: 'relative' }}>
              <Map
                isMarkerShown
                mapClick={this.mapClick}
                loadingElement={<div style={{ height: '100%' }} />}
                containerElement={
                  <div style={{ height: '330px', width: '100%', position: 'relative' }} />
                }
                mapElement={<div style={{ height: '100%' }} />}
                center={locationObj}
                markerPosition={locationObj}
                locF={this.state.locF}
                mapApply={this.mapApply}
              />
              <FormHelperText>
                You can drag the map and click it to position the marker at the location of this accomodation. Once the marker is placed, click "Apply" and we will take care of the rest.
              </FormHelperText>
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

BusinessEditGeneralInformation.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

export default withConnect(BusinessEditGeneralInformation);
