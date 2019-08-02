/**
 *
 * ComponentStateless
 *
 */

import React from 'react';

import {
  GoogleMap,
  Marker,
  withGoogleMap,
  InfoWindow,
  OverlayView
} from 'react-google-maps';

import { compose } from 'redux';


class Map extends React.Component {
  constructor(props) {
    super(props);

    this.state = { markerStatus: [] };
    this.isOpen = false;

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
      });
    }
  }

  onMapMarkerClick() {
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
                onClick={this.props.onToggleOpen}
                mapPaneName={OverlayView.OVERLAY_MOUSE_TARGET}
                getPixelPositionOffset={(width, height) => ({ x: -(width / 2), y: -(height) })}
              >
                <div 
                style={{ 
                  backgroundColor: 'white',
                  color: '#8F3F3F',
                  padding: '4px 10px',
                  borderRadius: '3px',
                  fontFamily: 'Ubuntu',
                  fontSize: '12px', 
                  fontWeight: '700',
                }}
                onClick={this.onMapMarkerClick}>
                  {v.businessUnit.rate}$
                </div>
              </OverlayView>
            ))}
        </GoogleMap>
      </React.Fragment>
    );
  }
}

Map.propTypes = {};

export default compose(withGoogleMap)(Map);
