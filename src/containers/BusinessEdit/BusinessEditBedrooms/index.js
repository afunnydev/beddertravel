import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';

import AddIcon from '@material-ui/icons/Add';
import RemoveIcon from '@material-ui/icons/Remove';

import BedderValidator from 'bedder/bedderValidator';
import calculateProgress from 'utils/calculateProgress';

import RoomButtons from './RoomButtons.js';
import Room from './Room';
import ProgressTitle from '../ProgressTitle';

import { withConnect as withReduxConnect } from '../BusinessEditBedroomsRedux';
import BusinessEditBedroomsRedux from '../BusinessEditBedroomsRedux/Loadable';

BedderValidator.prepareTextField();

/* eslint-disable react/prefer-stateless-function */
export class BusinessEditBedrooms extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      removeDialogOpen: false,
      removeConfirm: false,
      isRoomValid: true,
      validationErrors: {
        photos: false,
        beds: false,
        name: false,
        numRooms: false,
        numPeople: false,
        price: false,
        discount: false,
        size: false,
      },
    };
    this.addRoom = this.addRoom.bind(this);
    this.removeRoom = this.removeRoom.bind(this);
    this.changeRoom = this.changeRoom.bind(this);
    this.openRemoveDialog = this.openRemoveDialog.bind(this);
    this.closeRemoveDialog = this.closeRemoveDialog.bind(this);
    this.removeRoomConfirm = this.removeRoomConfirm.bind(this);
    this.vRefs = BedderValidator.makeRefs(BedderValidator.getBusinessEditRoomPage());
    this.validationErrors = {};
  }

  openRemoveDialog() {
    this.setState({removeDialogOpen: true});
  }

  closeRemoveDialog() {
    this.setState({removeDialogOpen: false});
  }

  addRoom() {
    if(this.validate()) {
      this.props.addRoom();
    }
  }

  removeRoomConfirm() {
    this.setState({removeConfirm: true}, () => {
      this.removeRoom();
    });
  }

  removeRoom() {
    if(this.state.removeConfirm === false) {
      this.openRemoveDialog();
    } else {
      this.closeRemoveDialog();
      this.setState({removeConfirm: false}, () => {
        this.props.deleteRoom();
        this.props.onChangeActiveRoom(-1);
      });
    }

  }

  changeRoom(room) {
    this.props.onChangeActiveRoom(room);
  }

  componentDidUpdate(prevProps) {
    if(prevProps != this.props && this.state.isRoomValid == false) {
      this.validate();
    }
  }

  validateRest() {
    var validationErrors = this.state.validationErrors;
    let ret = true;

    if(this.props.roomPhotos &&
      this.props.roomPhotos.get('byId') &&
      this.props.roomPhotos.get('byId').size > 1
    ) {
      validationErrors['photos'] = false;
    } else {
      validationErrors['photos'] = true;
      ret = false;
    }

    if (this.props.roomBedsKing + this.props.roomBedsQueen + this.props.roomBedsSimple <= 0) {
      validationErrors['beds'] = true;
      ret = false;
    } else {
      validationErrors['beds'] = false;
    }

    if(this.props.roomName.length > 0) {
      validationErrors['name'] = false;
    } else {
      validationErrors['name'] = true;
      ret = false;
    }

    if(this.props.roomNumRooms > 0) {
      validationErrors['numRooms'] = false;
    } else {
      validationErrors['numRooms'] = true;
      ret = false;
    }

    if(this.props.roomNumPeople > 0) {
      validationErrors['numPeople'] = false;
    } else {
      validationErrors['numPeople'] = true;
      ret = false;
    }

    if(this.props.roomPrice > 0) {
      validationErrors['price'] = false;
    } else {
      validationErrors['price'] = true;
      ret = false;
    }

    if(this.props.roomDiscount > -1) {
      validationErrors['discount'] = false;
    } else {
      validationErrors['discount'] = true;
      ret = false;
    }

    this.setState({ isRoomValid: ret });
    this.setState({ validationErrors });
    this.setState({ refresh: !this.state.refresh });
    return ret;
  }

  validate() {
    let ret = true;

    if(!this.validateRest()) {
      ret = false;
    }

    this.setState({ refresh: !this.state.refresh });
    return ret;
  }

  render() {
    const { rooms, vRefs, validationErrors, ...restProps } = this.props;
    const validationErrorsNew = this.state.validationErrors;
    const progress = calculateProgress([
      this.props.roomName, 
      this.props.roomNumRooms, 
      this.props.roomNumPeople, 
      this.props.roomBedsKing || this.props.roomBedsQueen || this.props.roomBedsSimple, 
      this.props.roomPhotos && this.props.roomPhotos.get('byId') && this.props.roomPhotos.get('byId').get('1'), 
      this.props.roomPrice,
    ]);

    return (
      <React.Fragment>
        <BusinessEditBedroomsRedux modelResult={this.props.modelResult} />

        <Dialog
          disableBackdropClick
          disableEscapeKeyDown
          maxWidth="xs"
          open={this.state.removeDialogOpen}
        >
          <DialogContent>
            Are you sure you want to remove current room?
          </DialogContent>
          <DialogActions>
            <Button onClick={this.closeRemoveDialog} color="primary">
              Cancel
            </Button>
            <Button onClick={this.removeRoomConfirm} color="primary">
              Ok
            </Button>
          </DialogActions>
        </Dialog>

        <Grid item xs={12} md={3} style={this.props.isMobile ? {} : { paddingRight: 30 }}>
          <ProgressTitle text="Bedrooms" progress={progress} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              {rooms && rooms.size > 0 ? (
                <RoomButtons
                  rooms={rooms}
                  activeRoom={this.props.activeRoom}
                  onClick={this.changeRoom}
                />
              ) : (
                <Button disabled>No rooms yet</Button>
              )}

              <Button
                variant="contained"
                onClick={this.addRoom}
                style={{ 
                  minWidth: 'auto', 
                  margin: '0px 4px',
                  height: 56,
                  backgroundColor: 'white'
                }}
              >
                <AddIcon />
              </Button>
              {rooms && rooms.get('byId') && rooms.get('byId').size > 1 && (
                <Button
                  variant="contained"
                  onClick={this.removeRoom}
                  style={{ 
                    minWidth: 'auto', 
                    margin: '0px 4px',
                    height: 56,
                    backgroundColor: 'white'
                  }}
                >
                  <RemoveIcon />
                </Button>
              )}
            </Grid>
            <Grid item xs={12}>
              {rooms && rooms.size > 0 && this.props.activeRoom >= 0 ? (
                <Room 
                  width={this.props.width} 
                  isMobile={this.props.isMobile} 
                  validationErrors={validationErrorsNew} 
                  refresh={this.state.refresh} 
                  notrefresh={!this.state.refresh} 
                  vRefs={this.vRefs} 
                  {...restProps} 
                />
              ) : (
                <Typography>No rooms yet</Typography>
              )}
            </Grid>
          </Grid>
        </Grid>
      </React.Fragment>
    );
  }
}

BusinessEditBedrooms.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
  null,
  {forwardRef: true, pure: true}
);

export default compose(
  withConnect,
  withReduxConnect,
)(BusinessEditBedrooms);
