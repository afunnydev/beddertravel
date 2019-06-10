import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const styles = {
  btnRoot: {
    height: 56,
    minWidth: 'initial',
    borderRadius: 3,
    paddingRight: 30,
    paddingLeft: 30,
    margin: '4px 4px',
  },
  btnContained: {
    backgroundColor: '#fff',
    color: '#000',
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
  },
  btnContainedPrimary: {
    color: '#fff',
    backgroundColor: '#4B3F8F',
    '&:hover': {
      backgroundColor: '#4B3F8F',
    },
  },
};

const RoomButtons = (props) => (
  <React.Fragment>
    {Object.values(props.rooms.get('allIds').toJS()).map(index => {
      const v = props.rooms.get('byId').get(index);
      return (
        <Button
          key={index}
          variant="contained"
          onClick={props.onClick.bind(null, index)}
          classes={{ root: props.classes.btnRoot, contained: props.classes.btnContained, containedPrimary: props.classes.btnContainedPrimary }}
          color={index == props.activeRoom ? 'primary' : 'default'}
        >
          {v.get('roomName') !== '' ? v.get('roomName') : `Room ${parseInt(index) + 1}`}
        </Button>
      );
    })}
  </React.Fragment>
);

RoomButtons.propTypes = {
  classes: PropTypes.object.isRequired,
  rooms: PropTypes.object.isRequired,
  activeRoom: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
};

export default withStyles(styles)(RoomButtons);
