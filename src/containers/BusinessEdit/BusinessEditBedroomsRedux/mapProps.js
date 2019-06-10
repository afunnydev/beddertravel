import {
  changeRoomsAction,
  changeActiveRoomAction,
  changeRoomNameAction,
  changeRoomNumRoomsAction,
  changeRoomBedsKingAction,
  changeRoomBedsQueenAction,
  changeRoomBedsSimpleAction,
  changeRoomNumPeopleAction,
  changeRoomSizeAction,
  changeRoomSizeMeasureAction,
  changeRoomEquipmentAction,
  changeRoomPhotosAction,
  changeRoomPriceAction,
  changeRoomDiscountAction,
  changeIsDeletedAction,
  changeIsNewAction,
  addRoomAction,
  deleteRoomAction,
  cloneRoomAction,
  sortRoomAction,
  addPhotoAction,
  removePhotoAction,
  selectPhotoAction,
  processModelAction,
  changeRoomModelIdAction, 
  changeRoomDescriptionAction,
} from './actions';
import {
  makeSelectBusinessEditBedroomsRedux,
  makeSelectRooms,
  makeSelectActiveRoom,
  makeSelectRoomName,
  makeSelectRoomNumRooms,
  makeSelectRoomBedsKing,
  makeSelectRoomBedsQueen,
  makeSelectRoomBedsSimple,
  makeSelectRoomNumPeople,
  makeSelectRoomSize,
  makeSelectRoomSizeMeasure,
  makeSelectRoomEquipment,
  makeSelectRoomPhotos,
  makeSelectRoomPrice,
  makeSelectRoomDiscount,
  makeSelectIsDeleted,
  makeSelectIsNew,
  makeSelectRoomModelId, makeSelectRoomDescription,
} from './selectors';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  businessaddbedroomsredux: makeSelectBusinessEditBedroomsRedux(),
  rooms: makeSelectRooms(),
  activeRoom: makeSelectActiveRoom(),
  roomName: makeSelectRoomName(),
  roomDescription: makeSelectRoomDescription(),
  roomNumRooms: makeSelectRoomNumRooms(),
  roomBedsKing: makeSelectRoomBedsKing(),
  roomBedsQueen: makeSelectRoomBedsQueen(),
  roomBedsSimple: makeSelectRoomBedsSimple(),
  roomNumPeople: makeSelectRoomNumPeople(),
  roomSize: makeSelectRoomSize(),
  roomModelId: makeSelectRoomModelId(),
  roomSizeMeasure: makeSelectRoomSizeMeasure(),
  roomEquipment: makeSelectRoomEquipment(),
  roomPhotos: makeSelectRoomPhotos(),
  roomPrice: makeSelectRoomPrice(),
  roomDiscount: makeSelectRoomDiscount(),
  isDeleted: makeSelectIsDeleted(),
  isNew: makeSelectIsNew(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    changeRoomModelId: evt => {
      dispatch(changeRoomModelIdAction(evt));
    },
    processModel: evt => {
      dispatch(processModelAction(evt));
    },
    addPhoto: evt => {
      dispatch(addPhotoAction(evt));
    },
    removePhoto: evt => {
      dispatch(removePhotoAction(evt));
    },
    selectPhoto: evt => {
      dispatch(selectPhotoAction(evt));
    },
    addRoom: evt => {
      dispatch(addRoomAction('new'));
      dispatch(changeActiveRoomAction());
    },
    deleteRoom: evt => {
      dispatch(deleteRoomAction(evt));
    },
    cloneRoom: evt => {
      dispatch(cloneRoomAction(evt));
    },
    sortRoom: evt => {
      dispatch(sortRoomAction(evt));
    },
    onChangeRooms: evt => {
      dispatch(changeRoomsAction(evt.target.value));
    },
    onChangeActiveRoom: evt => {
      dispatch(changeActiveRoomAction(evt));
    },
    onChangeRoomName: evt => {
      dispatch(changeRoomNameAction(evt.target.value));
    },
    onChangeRoomDescription: evt => {
      dispatch(changeRoomDescriptionAction(evt.target.value));
    },
    onChangeRoomNumRooms: evt => {
      dispatch(changeRoomNumRoomsAction(evt.target.value));
    },
    onChangeRoomBedsKing: evt => {
      dispatch(changeRoomBedsKingAction(evt.target.value));
    },
    onChangeRoomBedsQueen: evt => {
      dispatch(changeRoomBedsQueenAction(evt.target.value));
    },
    onChangeRoomBedsSimple: evt => {
      dispatch(changeRoomBedsSimpleAction(evt.target.value));
    },
    onChangeRoomNumPeople: evt => {
      dispatch(changeRoomNumPeopleAction(evt.target.value));
    },
    onChangeRoomSize: evt => {
      dispatch(changeRoomSizeAction(evt.target.value));
    },
    onChangeRoomSizeMeasure: evt => {
      dispatch(changeRoomSizeMeasureAction(evt.target.value));
    },
    onChangeRoomEquipment: evt => {
      dispatch(changeRoomEquipmentAction(evt));
    },
    onChangeRoomPhotos: evt => {
      dispatch(changeRoomPhotosAction(evt.target.value));
    },
    onChangeRoomPrice: evt => {
      dispatch(changeRoomPriceAction(evt.target.value));
    },
    onChangeRoomDiscount: evt => {
      dispatch(changeRoomDiscountAction(evt.target.value));
    },
    onChangeIsDeleted: evt => {
      dispatch(changeIsDeletedAction(evt.target.value));
    },
    onChangeIsNew: evt => {
      dispatch(changeIsNewAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
