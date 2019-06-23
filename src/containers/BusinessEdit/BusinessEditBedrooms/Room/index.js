import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import InputAdornment from '@material-ui/core/InputAdornment';
import Grid from '@material-ui/core/Grid';
import MenuItem from '@material-ui/core/MenuItem';
import Tooltip from '@material-ui/core/Tooltip';

import CurrencySelector from 'components/CurrencySelector';

import Photos from './Photos';
import Amenities from '../../BusinessEditGeneralInformation/Amenities';
import { addPhotoAction, removePhotoAction } from '../../BusinessEditBedroomsRedux/actions';

const styles = {
  spacedInput: {
    justifyContent: 'space-between',
  },
  rightSelect: {
    width: 120,
    textAlign: 'right',
  },
};

export class Room extends React.Component {
  constructor(props) {
    super(props);
  }

  addPhoto = (result) => {
    this.props.dispatch(addPhotoAction(result));
  }

  removePhoto = (i) => {
    this.props.dispatch(removePhotoAction(i));
  }

  render() {
    const nums = [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33];
    const nums0 = [0].concat(nums);

    return (
      <React.Fragment>
        <div style={{ padding: '10px 0px' }}>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={4}>
              <TextField
                fullWidth
                id="roomName"
                error={this.props.validationErrors.name}
                label="Name of the room"
                value={this.props.roomName}
                onChange={this.props.onChangeRoomName}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
            <Grid item xs={12} sm={4}>
              <Tooltip placement="left" title="If it's a shared bedroom, you can put the number of beds here.">
                <TextField
                  fullWidth
                  select
                  disabled={this.props.roomModelId > 0 ? true : false}
                  error={this.props.validationErrors.numRooms}
                  id="roomNumRooms"
                  label="Number of the same room available"
                  value={this.props.roomNumRooms}
                  onChange={this.props.onChangeRoomNumRooms}
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Room(s)</InputAdornment>,
                    classes: { root: this.props.classes.spacedInput },
                  }}
                  SelectProps={{
                    classes: { root: this.props.classes.rightSelect },
                  }}
                  style={{ marginBottom: 24 }}
                >   
                  {nums.map(option => (
                    <MenuItem key={option} value={option}>
                      {option}
                    </MenuItem>
                  ))}
                </TextField>
              </Tooltip> 
              <TextField
                fullWidth
                select
                id="roomNumPeople"
                error={this.props.validationErrors.numPeople}
                label="Maximum capacity of the room"
                value={this.props.roomNumPeople}
                onChange={this.props.onChangeRoomNumPeople}
                InputProps={{
                  startAdornment: <InputAdornment position="start">Person(s)</InputAdornment>,
                  classes: { root: this.props.classes.spacedInput },
                }}
                SelectProps={{
                  classes: { root: this.props.classes.rightSelect },
                }}
              >
                {nums.map(option => (
                  <MenuItem key={option} value={option}>
                    {option}
                  </MenuItem>
                ))}
              </TextField>  
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel shrink style={{ marginBottom: 8 }}>Type and quantity of bed</InputLabel>
              <FormControl fullWidth>
                <TextField
                  select
                  fullWidth
                  error={this.props.validationErrors.beds}
                  value={this.props.roomBedsKing}
                  onChange={this.props.onChangeRoomBedsKing}
                  id="roomBedsKing"
                  name="roomBedsKing"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">King size bed(s)</InputAdornment>,
                    classes: { root: this.props.classes.spacedInput },
                  }}
                  SelectProps={{
                    classes: { root: this.props.classes.rightSelect },
                  }}
                >
                  {nums0.map(option => (
                    <MenuItem key={option} value={option}>
                      {option === 0 ? 'None' : option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  error={this.props.validationErrors.beds}
                  value={this.props.roomBedsQueen}
                  onChange={this.props.onChangeRoomBedsQueen}
                  name="roomBedsQueen"
                  id="roomBedsQueen"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Queen size bed(s)</InputAdornment>,
                    classes: { root: this.props.classes.spacedInput },
                  }}
                  SelectProps={{
                    classes: { root: this.props.classes.rightSelect },
                  }}
                >
                  {nums0.map(option => (
                    <MenuItem key={option} value={option}>
                      {option === 0 ? 'None' : option}
                    </MenuItem>
                  ))}
                </TextField>
                <TextField
                  select
                  fullWidth
                  error={this.props.validationErrors.beds}
                  value={this.props.roomBedsSimple}
                  onChange={this.props.onChangeRoomBedsSimple}
                  name="roomBedsSimple"
                  id="roomBedsSimple"
                  InputProps={{
                    startAdornment: <InputAdornment position="start">Single size bed(s)</InputAdornment>,
                    classes: { root: this.props.classes.spacedInput },
                  }}
                  SelectProps={{
                    classes: { root: this.props.classes.rightSelect },
                  }}
                >
                  {nums0.map(option => (
                    <MenuItem key={option} value={option}>
                      {option === 0 ? 'None' : option}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>

              {this.props.validationErrors.beds && 
                <InputLabel error style={{ marginTop: 10 }}>You need at least one (1) bed in this room.</InputLabel> }
            </Grid>
          </Grid>
          <Grid container spacing={3}>
            <Grid item xs={12} sm={8}>
              <InputLabel shrink style={{ marginBottom: 8 }}>Equipment in the room</InputLabel>
              <Amenities changeFn={this.props.onChangeRoomEquipment} amenities={this.props.roomEquipment} />
            </Grid>
            <Grid item xs={12} sm={4}>
              <InputLabel shrink error={this.props.validationErrors.photos} style={{ marginBottom: 10 }}>Photos of the room*</InputLabel>
              <Photos
                addPhoto={this.addPhoto}
                photos={this.props.roomPhotos}
                removePhoto={this.removePhoto}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                id="roomPrice"
                label="Price per night"
                error={this.props.validationErrors.price}
                value={this.props.roomPrice != 0 ? this.props.roomPrice / 100 : ''}
                onChange={this.props.onChangeRoomPrice}
                type="number"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <CurrencySelector currency={this.props.roomCurrency} onChange={this.props.onChangeRoomCurrency}/>
                    </InputAdornment>),
                  classes: { root: this.props.classes.spacedInput },
                }}
                SelectProps={{
                  classes: { root: this.props.classes.rightSelect },
                }}
                InputLabelProps={{
                  shrink: true,
                }}
              />
            </Grid>
          </Grid>
        </div>
      </React.Fragment>
    );
  }
}

Room.propTypes = {
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
);

export default compose(
  withConnect,
  withStyles(styles),
)(Room);
