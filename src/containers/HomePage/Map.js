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
  OverlayView
} from 'react-google-maps';

import { compose } from 'redux';

import { compose as rerecompose, withStateHandlers } from 'recompose';


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
    return (
      <React.Fragment>
        <GoogleMap
          style={this.props.style || {}}
          defaultZoom={8}
          defaultCenter={this.props.defaultCenter}
        >
          { this.props.result &&
            this.props.result.result &&
            this.props.result.result.length > 0 &&
            this.props.result.result.map((v, i) => (              
              <OverlayView 
                key={i}
                value={v}
                position={{
                  lat: parseFloat(v.business.address.lat),
                  lng: parseFloat(v.business.address.lon),
                }}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -(height) })}
                >
                  <div style={{ backgroundColor: 'yellow' }}>We're here</div>
              </OverlayView>
            ))}
        </GoogleMap>
      </React.Fragment>
    );
  }
}

Map.propTypes = {};

export default compose(withGoogleMap)(Map);
