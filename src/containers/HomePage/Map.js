/**
 *
 * ComponentStateless
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';

import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  InfoWindow,
} from 'react-google-maps';

import { compose } from 'redux';

import { compose as rerecompose, withStateHandlers } from 'recompose';

import BtnBgImage from './mapButtonBackground.png';

const MarkedInfoWindow = rerecompose(
  withStateHandlers(
    () => ({
      isOpen: false,
    }),
    {
      onToggleOpen: ({ isOpen }) => () => ({
        isOpen: !isOpen,
      }),
    },
  ),
  // withScriptjs,
  // withGoogleMap
)(props => (
  <Marker position={props.position} onClick={props.onToggleOpen}>
    {props.isOpen && (
      <InfoWindow onClick={props.onToggleOpen}>
        <React.Fragment>
          <Grid
            container
            style={{ maxWidth: 200 }}
            component={Link}
            to={`/business/view/${props.value.business.id}`}
            target="blank"
          >
            <Grid item xs={12}>
              {/* <img src={props.value.business.coverPhoto ? props.value.business.coverPhoto.photos.photos.byId[1].data : BtnBgImage} style={{width: '100%'}} /> */}
              <img
                alt={props.value.business.name}
                src={
                  props.value.business.coverPhoto
                    ? (props.value.business.coverPhoto.photos &&
                      props.value.business.coverPhoto.photos.photos.byId[1].data) ||
                    null
                    : BtnBgImage
                }
                style={{ width: '100%' }}
              />
            </Grid>
            <Grid item xs={12}>
              <Grid container style={{ paddingLeft: 0 }}>
                <Grid item xs={12}>
                  <Typography variant="body2">
                    {props.value.business.name}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography>
                    ${parseInt(props.value.businessUnit.rate, 10)}
                  </Typography>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </React.Fragment>
      </InfoWindow>
    )}
  </Marker>
));

// const SomeButton = () => withStyles(styles)();

class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = { markerStatus: [] };

    this.processResult = this.processResult.bind(this);
  }

  componentDidMount() {
    this.processResult();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.result !== this.props.result) {
      this.processResult();
    }
  }

  processResult() {
    // var parsedResult = [];

    if (
      this.props.result &&
      this.props.result.result &&
      this.props.result.result.length > 0
    ) {
      this.props.result.result.map((v, i) => {
        if (!this.state.markerStatus[i]) {
          // console.log('processing marker', i)
          const mStatus = this.state.markerStatus;
          mStatus[i] = false;
          this.setState({ markerStatus: mStatus });
        }
        // parsedResult.push({lat: v.business.address.lat, lng: v.business.address.lon});
      });
    }
  }

  render() {
    const { classes, ...restProps } = this.props;
    // console.log('Map PROPS', this.props);

    return (
      <React.Fragment>
        <GoogleMap
          style={this.props.style || {}}
          defaultZoom={8}
          defaultCenter={this.props.defaultCenter}
        >
          {this.props.result &&
            this.props.result.result &&
            this.props.result.result.length > 0 &&
            this.props.result.result.map((v, i) => (
              // 'dfs'
              <MarkedInfoWindow
                key={i}
                value={v}
                position={{
                  lat: parseFloat(v.business.address.lat),
                  lng: parseFloat(v.business.address.lon),
                }}
              />
            ))}
        </GoogleMap>
      </React.Fragment>
    );
  }
}

Map.propTypes = {};

export default compose(withGoogleMap)(Map);
