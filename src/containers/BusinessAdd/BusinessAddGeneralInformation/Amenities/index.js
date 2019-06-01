import React from 'react';
import PropTypes from 'prop-types';

import Button from '@material-ui/core/Button';
import Tooltip from '@material-ui/core/Tooltip';
import { withStyles } from '@material-ui/core/styles';

import BedderConfig from 'bedder/bedderConfig';

const styles = () => ({
  tooltip: {
    fontSize: 15,
  },
  btnRoot: {
    width: 56,
    height: 56,
    minWidth: 'initial',
    borderRadius: 3,
  },
  btnContained: {
    backgroundColor: '#fff',
    color: '#4B3F8F',
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
  },
  btnContainedPrimary: {
    color: '#fff',
    backgroundColor: '#4B3F8F',
    '&:hover': {
      backgroundColor: '#4B3F8F',
    },
  },
});

const AmenitiesText = BedderConfig.getAmenitiesText();

const Amenities = ({ changeFn, amenities, classes, noClick }) => (
  <React.Fragment>
    { amenities !== '' && amenities && AmenitiesText.map(amenity => (
      <Tooltip key={amenity.key} classes={{ tooltip: classes.tooltip }} title={amenity.text}>
        <Button 
          classes={{ root: classes.btnRoot, contained: classes.btnContained, containedPrimary: classes.btnContainedPrimary }} 
          variant="contained" 
          style={{ margin: '4px 4px' }} 
          onClick={() => { if (!noClick) changeFn(amenity.key); }}
          color={amenities.get(amenity.key) ? 'primary' : 'default'}
          disableRipple={noClick}
        >
          <span className={`icon-${amenity.key}`} style={{ fontSize: 30 }} />
        </Button>
      </Tooltip>
    ))}
  </React.Fragment>
);

Amenities.defaultProps = {
  noClick: false,
};

Amenities.propTypes = {
  changeFn: PropTypes.func,
  amenities: PropTypes.object,
  classes: PropTypes.object.isRequired,
  noClick: PropTypes.bool,
};

export default withStyles(styles)(Amenities);
