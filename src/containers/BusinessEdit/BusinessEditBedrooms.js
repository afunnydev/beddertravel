import React, { useState } from 'react';
import PropTypes from 'prop-types';

import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';

import BedderValidator from 'bedder/bedderValidator';
import calculateProgress from 'utils/calculateProgress';

import RoomButtons from './RoomButtons.js';
import Room from './Room.js';
import ProgressTitle from './ProgressTitle.js';

BedderValidator.prepareTextField();

const BusinessEditBedrooms = (props) => {
  const [activeRoomId, setActiveRoomId] = useState(null);
  const [validationErrors, setValidationErrors] = useState(false);
  const progress = calculateProgress([
    props.roomName, 
    props.roomNumRooms, 
    props.roomNumPeople, 
    props.roomBedsKing || props.roomBedsQueen || props.roomBedsSimple, 
    props.roomPrice,
  ]);
  const vRefs = BedderValidator.makeRefs(BedderValidator.getBusinessEditRoomPage());

  return (
    <>
      <Grid container style={{ paddingTop: 50, paddingBottom: 30 }}>
        <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
          <ProgressTitle text="Bedrooms" progress={progress} />
        </Grid>

        <Grid item xs={12} md={9}>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <RoomButtons
                {...props}
                activeRoomId={activeRoomId || 0}
                roomChosen={setActiveRoomId}
              />
            </Grid>
            <Grid item xs={12}>
              {props.units.map(unit => (
                <Room
                  key={unit.id}
                  activeRoomId={unit.id}
                  validationErrors={validationErrors} 
                  vRefs={vRefs} 
                  client={props.client}
                  visible={unit.id === activeRoomId}
                />
              ))}
              {/* {activeRoomId ? (
              {/*   <Room  */}
              {/*     activeRoomId={activeRoomId} */}
              {/*     validationErrors={validationErrors}  */}
              {/*     vRefs={vRefs}  */}
              {/*     client={props.client} */}
              {/*   /> */}
              {/* ) : ( */}
              {/*   <Typography>Please select or create a room to start.</Typography> */}
              {/* )} */}
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </>
  );
};

export default BusinessEditBedrooms;
/* eslint-disable react/prefer-stateless-function */
// export class BusinessEditBedrooms extends React.Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       refresh: false,
//       removeDialogOpen: false,
//       removeConfirm: false,
//       isRoomValid: true,
//       validationErrors: {
//         photos: false,
//         beds: false,
//         name: false,
//         numRooms: false,
//         numPeople: false,
//         price: false,
//         discount: false,
//         size: false,
//       },
//     };
//     this.addRoom = this.addRoom.bind(this);
//     this.removeRoom = this.removeRoom.bind(this);
//     this.changeRoom = this.changeRoom.bind(this);
//     this.openRemoveDialog = this.openRemoveDialog.bind(this);
//     this.closeRemoveDialog = this.closeRemoveDialog.bind(this);
//     this.removeRoomConfirm = this.removeRoomConfirm.bind(this);
//     this.vRefs = BedderValidator.makeRefs(BedderValidator.getBusinessEditRoomPage());
//     this.validationErrors = {};
//   }
// 
//   validateRest() {
//     var validationErrors = this.state.validationErrors;
//     let ret = true;
// 
//     if(this.props.roomPhotos &&
//       this.props.roomPhotos.get('byId') &&
//       this.props.roomPhotos.get('byId').size > 1
//     ) {
//       validationErrors['photos'] = false;
//     } else {
//       validationErrors['photos'] = true;
//       ret = false;
//     }
// 
//     if (this.props.roomBedsKing + this.props.roomBedsQueen + this.props.roomBedsSimple <= 0) {
//       validationErrors['beds'] = true;
//       ret = false;
//     } else {
//       validationErrors['beds'] = false;
//     }
// 
//     if(this.props.roomName.length > 0) {
//       validationErrors['name'] = false;
//     } else {
//       validationErrors['name'] = true;
//       ret = false;
//     }
// 
//     if(this.props.roomNumRooms > 0) {
//       validationErrors['numRooms'] = false;
//     } else {
//       validationErrors['numRooms'] = true;
//       ret = false;
//     }
// 
//     if(this.props.roomNumPeople > 0) {
//       validationErrors['numPeople'] = false;
//     } else {
//       validationErrors['numPeople'] = true;
//       ret = false;
//     }
// 
//     if(this.props.roomPrice > 0) {
//       validationErrors['price'] = false;
//     } else {
//       validationErrors['price'] = true;
//       ret = false;
//     }
// 
//     if(this.props.roomDiscount > -1) {
//       validationErrors['discount'] = false;
//     } else {
//       validationErrors['discount'] = true;
//       ret = false;
//     }
// 
//     this.setState({ isRoomValid: ret });
//     this.setState({ validationErrors });
//     this.setState({ refresh: !this.state.refresh });
//     return ret;
//   }
// 
//   validate() {
//     let ret = true;
// 
//     if(!this.validateRest()) {
//       ret = false;
//     }
// 
//     this.setState({ refresh: !this.state.refresh });
//     return ret;
//   }
// 
//   render() {
//     const { rooms, vRefs, validationErrors, ...restProps } = this.props;
//     const validationErrorsNew = this.state.validationErrors;
//     const progress = calculateProgress([
//       this.props.roomName, 
//       this.props.roomNumRooms, 
//       this.props.roomNumPeople, 
//       this.props.roomBedsKing || this.props.roomBedsQueen || this.props.roomBedsSimple, 
//       this.props.roomPhotos && this.props.roomPhotos.get('byId') && this.props.roomPhotos.get('byId').get('1'), 
//       this.props.roomPrice,
//     ]);
// 
//     return (
//       <React.Fragment>
//         <BusinessEditBedroomsRedux modelResult={this.props.modelResult} />
// 
//         <Dialog
//           disableBackdropClick
//           disableEscapeKeyDown
//           maxWidth="xs"
//           open={this.state.removeDialogOpen}
//         >
//           <DialogContent>
//             Are you sure you want to remove current room?
//           </DialogContent>
//           <DialogActions>
//             <Button onClick={this.closeRemoveDialog} color="primary">
//               Cancel
//             </Button>
//             <Button onClick={this.removeRoomConfirm} color="primary">
//               Ok
//             </Button>
//           </DialogActions>
//         </Dialog>
// 
//         <Grid item xs={12} md={3} style={this.props.isMobile ? {} : { paddingRight: 30 }}>
//           <ProgressTitle text="Bedrooms" progress={progress} />
//         </Grid>
// 
//         <Grid item xs={12} md={9}>
//           <Grid container spacing={2}>
//             <Grid item xs={12}>
//               {rooms && rooms.size > 0 ? (
//                 <RoomButtons
//                   rooms={rooms}
//                   activeRoom={this.props.activeRoom}
//                   onClick={this.changeRoom}
//                 />
//               ) : (
//                 <Button disabled>No rooms yet</Button>
//               )}
// 
//               <Button
//                 variant="contained"
//                 onClick={this.addRoom}
//                 style={{ 
//                   minWidth: 'auto', 
//                   margin: '0px 4px',
//                   height: 56,
//                   backgroundColor: 'white'
//                 }}
//               >
//                 <AddIcon />
//               </Button>
//               {rooms && rooms.get('byId') && rooms.get('byId').size > 1 && (
//                 <Button
//                   variant="contained"
//                   onClick={this.removeRoom}
//                   style={{ 
//                     minWidth: 'auto', 
//                     margin: '0px 4px',
//                     height: 56,
//                     backgroundColor: 'white'
//                   }}
//                 >
//                   <RemoveIcon />
//                 </Button>
//               )}
//             </Grid>
//             <Grid item xs={12}>
//               {rooms && rooms.size > 0 && this.props.activeRoom >= 0 ? (
//                 <Room 
//                   width={this.props.width} 
//                   isMobile={this.props.isMobile} 
//                   validationErrors={validationErrorsNew} 
//                   refresh={this.state.refresh} 
//                   notrefresh={!this.state.refresh} 
//                   vRefs={this.vRefs} 
//                   {...restProps} 
//                 />
//               ) : (
//                 <Typography>No rooms yet</Typography>
//               )}
//             </Grid>
//           </Grid>
//         </Grid>
//       </React.Fragment>
//     );
//   }
// }
// 
// BusinessEditBedrooms.propTypes = {
//   dispatch: PropTypes.func.isRequired,
// };
// 
// function mapDispatchToProps(dispatch) {
//   return {
//     dispatch,
//   };
// }
// 
// const withConnect = connect(
//   null,
//   mapDispatchToProps,
//   null,
//   {forwardRef: true, pure: true}
// );
// 
// export default compose(
//   withConnect,
//   withReduxConnect,
// )(BusinessEditBedrooms);
