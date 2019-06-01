/*
 *
 * BusinessAddBedroomsRedux actions
 *
 */

import {
  CHANGE_ROOMS,
  CHANGE_ACTIVEROOM,
  CHANGE_ROOMNAME,
  CHANGE_ROOMNUMROOMS,
  CHANGE_ROOMBEDSKING,
  CHANGE_ROOMBEDSQUEEN,
  CHANGE_ROOMBEDSSIMPLE,
  CHANGE_ROOMNUMPEOPLE,
  CHANGE_ROOMSIZE,
  CHANGE_ROOMSIZEMEASURE,
  CHANGE_ROOMEQUIPMENT,
  CHANGE_ROOMPHOTOS,
  CHANGE_ROOMPRICE,
  CHANGE_ROOMDISCOUNT,
  CHANGE_ISDELETED,
  CHANGE_ISNEW,
  ADDROOM,
  DELETEROOM,
  CLONEROOM,
  SORTROOM,
  ADDPHOTO,
  REMOVEPHOTO,
  SELECTPHOTO,
  PROCESS_MODEL,
  CHANGE_ROOM_MODEL_ID, 
  CHANGE_ROOMDESCRIPTION,
} from './constants';

export function processModelAction(processModel) {
  return {
    type: PROCESS_MODEL,
    processModel,
  };
}
export function changeRoomModelIdAction(roomModelId) {
  return {
    type: CHANGE_ROOM_MODEL_ID,
    roomModelId,
  };
}
export function addPhotoAction(addPhoto) {
  return {
    type: ADDPHOTO,
    addPhoto,
  };
}
export function removePhotoAction(removePhoto) {
  return {
    type: REMOVEPHOTO,
    removePhoto,
  };
}
export function selectPhotoAction(selectPhoto) {
  return {
    type: SELECTPHOTO,
    selectPhoto,
  };
}
export function changeRoomsAction(rooms) {
  return {
    type: CHANGE_ROOMS,
    rooms,
  };
}
export function changeActiveRoomAction(activeRoom) {
  return {
    type: CHANGE_ACTIVEROOM,
    activeRoom,
  };
}
export function changeRoomNameAction(roomName) {
  return {
    type: CHANGE_ROOMNAME,
    roomName,
  };
}
export function changeRoomDescriptionAction(roomDescription) {
  return {
    type: CHANGE_ROOMDESCRIPTION,
    roomDescription,
  };
}
export function changeRoomNumRoomsAction(roomNumRooms) {
  return {
    type: CHANGE_ROOMNUMROOMS,
    roomNumRooms,
  };
}
export function changeRoomBedsKingAction(roomBedsKing) {
  return {
    type: CHANGE_ROOMBEDSKING,
    roomBedsKing,
  };
}
export function changeRoomBedsQueenAction(roomBedsQueen) {
  return {
    type: CHANGE_ROOMBEDSQUEEN,
    roomBedsQueen,
  };
}
export function changeRoomBedsSimpleAction(roomBedsSimple) {
  return {
    type: CHANGE_ROOMBEDSSIMPLE,
    roomBedsSimple,
  };
}
export function changeRoomNumPeopleAction(roomNumPeople) {
  return {
    type: CHANGE_ROOMNUMPEOPLE,
    roomNumPeople,
  };
}
export function changeRoomSizeAction(roomSize) {
  return {
    type: CHANGE_ROOMSIZE,
    roomSize,
  };
}
export function changeRoomSizeMeasureAction(roomSizeMeasure) {
  return {
    type: CHANGE_ROOMSIZEMEASURE,
    roomSizeMeasure,
  };
}
export function changeRoomEquipmentAction(roomEquipment) {
  return {
    type: CHANGE_ROOMEQUIPMENT,
    roomEquipment,
  };
}
export function changeRoomPhotosAction(roomPhotos) {
  return {
    type: CHANGE_ROOMPHOTOS,
    roomPhotos,
  };
}
export function changeRoomPriceAction(roomPrice) {
  return {
    type: CHANGE_ROOMPRICE,
    roomPrice,
  };
}
export function changeRoomDiscountAction(roomDiscount) {
  return {
    type: CHANGE_ROOMDISCOUNT,
    roomDiscount,
  };
}
export function changeIsDeletedAction(isDeleted) {
  return {
    type: CHANGE_ISDELETED,
    isDeleted,
  };
}
export function changeIsNewAction(isNew) {
  return {
    type: CHANGE_ISNEW,
    isNew,
  };
}
export function addRoomAction() {
  return {
    type: ADDROOM,
  };
}
export function deleteRoomAction() {
  return {
    type: DELETEROOM,
  };
}
export function cloneRoomAction() {
  return {
    type: CLONEROOM,
  };
}
export function sortRoomAction() {
  return {
    type: SORTROOM,
  };
}
