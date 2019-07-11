import BedderConfig from 'bedder/bedderConfig';
import { fromJS } from 'immutable';
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
  CHANGE_ROOMPRICE,
  CHANGE_ROOMCURRENCY,
  CHANGE_ROOMDISCOUNT,
  CHANGE_ISDELETED,
  CHANGE_ISNEW,
  ADDROOM,
  DELETEROOM,
  CLONEROOM,
  SORTROOM,
  ADDPHOTO,
  REMOVEPHOTO,
  PROCESS_MODEL,
  CHANGE_ROOM_MODEL_ID, CHANGE_ROOMDESCRIPTION,
} from './constants';

export const newRoomState = fromJS({
  roomName: '',
  roomDescription: '',
  roomNumRooms: 1,
  roomBedsKing: 0,
  roomBedsQueen: 0,
  roomBedsSimple: 0,
  roomNumPeople: 2,
  roomSize: '',
  roomModelId: -1,
  roomSizeMeasure: '',
  roomEquipment: BedderConfig.getEquipment(),
  roomPhotos: [],
  roomPrice: 0,
  roomCurrency: 'USD',
  roomDiscount: 0,
  isDeleted: false,
  isNew: true,
});

export const initialState = fromJS({
  rooms: {
    byId: {
      '0': newRoomState,
    },
    allIds: ['0'],
  },
  activeRoom: '0',
  roomName: '',
  roomDescription: '',
  roomNumRooms: 1,
  roomBedsKing: 0,
  roomBedsQueen: 0,
  roomBedsSimple: 0,
  roomNumPeople: 2,
  roomSize: '',
  roomModelId: -1,
  roomSizeMeasure: '',
  roomEquipment: BedderConfig.getEquipment(),
  roomPhotos: [],
  roomPrice: 0,
  roomCurrency: 'USD',
  roomDiscount: 0,
  isDeleted: false,
  isNew: true,
});

function businessAddBedroomsReduxReducer(state = initialState, action) {
  let roomPhotos = state.get('roomPhotos');

  switch (action.type) {
  case CHANGE_ROOMS:
    return state.set('rooms', action.rooms);
  case CHANGE_ACTIVEROOM:
    var actionActiveRoom = null;

    if (!action.activeRoom) {
      actionActiveRoom = state
        .get('rooms')
        .get('allIds')
        .last();
    } else {
      actionActiveRoom = action.activeRoom;
    }

    var index = state.get('activeRoom');
    var oldState = state;
    var activeRoom = oldState
      .get('rooms')
      .get('byId')
      .get(actionActiveRoom);

    if(action.activeRoom == -1) {
      actionActiveRoom = '0';
      activeRoom = oldState
        .get('rooms')
        .get('byId')
        .get('0');
    }

    return state
      .update('rooms', rooms =>{
        if(action.activeRoom == -1) {
          return rooms;
        }
        return rooms.update('byId', byId => {
          return byId.update(index, item =>
            item
              .set('roomName', oldState.get('roomName'))
              .set('roomDescription', oldState.get('roomDescription'))
              .set('roomNumRooms', oldState.get('roomNumRooms'))
              .set('roomBedsKing', oldState.get('roomBedsKing'))
              .set('roomBedsQueen', oldState.get('roomBedsQueen'))
              .set('roomBedsSimple', oldState.get('roomBedsSimple'))
              .set('roomNumPeople', oldState.get('roomNumPeople'))
              .set('roomModelId', oldState.get('roomModelId'))
              .set('roomSize', oldState.get('roomSize'))
              .set('roomSizeMeasure', oldState.get('roomSizeMeasure'))
              .set('roomEquipment', oldState.get('roomEquipment'))
              .set('roomPhotos', oldState.get('roomPhotos'))
              .set('roomPrice', oldState.get('roomPrice'))
              .set('roomCurrency', oldState.get('roomCurrency'))
              .set('roomDiscount', oldState.get('roomDiscount'))
              .set('isDeleted', oldState.get('isDeleted'))
              .set('isNew', oldState.get('isNew')),
          );
        });

      })
      .set('activeRoom', actionActiveRoom)
      .set('roomName', activeRoom.get('roomName'))
      .set('roomDescription', activeRoom.get('roomDescription'))
      .set('roomNumRooms', activeRoom.get('roomNumRooms'))
      .set('roomBedsKing', activeRoom.get('roomBedsKing'))
      .set('roomBedsQueen', activeRoom.get('roomBedsQueen'))
      .set('roomModelId', activeRoom.get('roomModelId'))
      .set('roomBedsSimple', activeRoom.get('roomBedsSimple'))
      .set('roomNumPeople', activeRoom.get('roomNumPeople'))
      .set('roomSize', activeRoom.get('roomSize'))
      .set('roomSizeMeasure', activeRoom.get('roomSizeMeasure'))
      .set('roomEquipment', activeRoom.get('roomEquipment'))
      .set('roomPhotos', activeRoom.get('roomPhotos'))
      .set('roomPrice', activeRoom.get('roomPrice'))
      .set('roomCurrency', activeRoom.get('roomCurrency'))
      .set('roomDiscount', activeRoom.get('roomDiscount'))
      .set('isDeleted', activeRoom.get('isDeleted'))
      .set('isNew', activeRoom.get('isNew'));

  case CHANGE_ROOMNAME:
    var index = state.get('activeRoom');
    return state.set('roomName', action.roomName).update('rooms', rooms =>
      rooms.update('byId', byId => byId.update(index, item =>
        item.set('roomName', action.roomName),
      )),
    );

  case CHANGE_ROOMDESCRIPTION:
    return state.set('roomDescription', action.roomDescription);
  case CHANGE_ROOM_MODEL_ID:
    return state.set('roomModelId', action.roomModelId);
  case CHANGE_ROOMNUMROOMS:
    return state.set('roomNumRooms', action.roomNumRooms);
  case CHANGE_ROOMBEDSKING:
    return state.set('roomBedsKing', action.roomBedsKing);
  case CHANGE_ROOMBEDSQUEEN:
    return state.set('roomBedsQueen', action.roomBedsQueen);
  case CHANGE_ROOMBEDSSIMPLE:
    return state.set('roomBedsSimple', action.roomBedsSimple);
  case CHANGE_ROOMNUMPEOPLE:
    return state.set('roomNumPeople', action.roomNumPeople);
  case CHANGE_ROOMSIZE:
    return state.set('roomSize', action.roomSize);
  case CHANGE_ROOMSIZEMEASURE:
    return state.set('roomSizeMeasure', action.roomSizeMeasure);
  case CHANGE_ROOMEQUIPMENT:
    return state
      .update('roomEquipment', roomEquipment =>
        roomEquipment.set(
          action.roomEquipment,
          !roomEquipment.get(action.roomEquipment),
        ),
      );
  case CHANGE_ROOMPRICE:
    return state.set('roomPrice', Math.round(action.roomPrice * 100));
  case CHANGE_ROOMCURRENCY:
    return state.set('roomCurrency', action.roomCurrency);
  case CHANGE_ROOMDISCOUNT:
    return state.set('roomDiscount', action.roomDiscount);
  case CHANGE_ISDELETED:
    return state.set('isDeleted', action.isDeleted);
  case CHANGE_ISNEW:
    return state.set('isNew', action.isNew);
  case ADDROOM:
    var newId = `${parseInt(
      state
        .get('rooms')
        .get('allIds')
        .last(),
    ) + 1}`;
    return state
      .updateIn(['rooms', 'allIds'], allIds =>
        allIds.push(newId),
      )
      .updateIn(['rooms', 'byId'], byId =>
        byId.set(newId, newRoomState),
      );
  case DELETEROOM:
    var actionActiveRoom = parseInt(state.get('activeRoom'));

    var val;
    return state
      .updateIn(
        ['rooms', 'allIds'],
        allIds =>{
          // console.log('allIds', allIds.get(action.removePhoto))

          return allIds.filter((o, i) => i !== actionActiveRoom )},
        // return allIds;
      )
      .updateIn(['rooms', 'byId'], byId => {
        // console.log('byId', byId)
        const { [actionActiveRoom]: val, ...withoutRemoved } = byId;
        // return allIds.filter((o,i) => i !== photo);
        return byId.delete(`${actionActiveRoom}`);
      });
  case CLONEROOM:
    var index = state.get('activeRoom');
    var oldState = state;

    return state.update('rooms', rooms =>
      // console.log('rooms', rooms);
      rooms.update('byId', byId => {
        // console.log("state.get('roomName')", oldState.get('roomName'));
        // console.log('index', index);

        return byId.update(index, item =>
          // console.log('item', item);
          item
            .set('roomName', oldState.get('roomName'))
            .set('roomDescription', oldState.get('roomDescription'))
            .set('roomNumRooms', oldState.get('roomNumRooms'))
            .set('roomBedsKing', oldState.get('roomBedsKing'))
            .set('roomBedsQueen', oldState.get('roomBedsQueen'))
            .set('roomBedsSimple', oldState.get('roomBedsSimple'))
            .set('roomNumPeople', oldState.get('roomNumPeople'))
            .set('roomModelId', oldState.get('roomModelId'))
            .set('roomSize', oldState.get('roomSize'))
            .set('roomSizeMeasure', oldState.get('roomSizeMeasure'))
            .set('roomEquipment', oldState.get('roomEquipment'))
            .set('roomPhotos', oldState.get('roomPhotos'))
            .set('roomPrice', oldState.get('roomPrice'))
            .set('roomCurrency', oldState.get('roomCurrency'))
            .set('roomDiscount', oldState.get('roomDiscount'))
            .set('isDeleted', oldState.get('isDeleted'))
            .set('isNew', oldState.get('isNew')),
        );
      }),
    );
  case SORTROOM:
    alert('change this sortRoom');
    return state.set('sortRoom', action.sortRoom);
  case ADDPHOTO:
    return state.set('roomPhotos', [ ...roomPhotos, action.roomPhoto]);
  case REMOVEPHOTO:
    if (!roomPhotos.length) return state;
    roomPhotos.splice(action.roomPhoto, 1);
    return state.set('roomPhotos', [ ...roomPhotos]);
  case PROCESS_MODEL:
    const processModel = action.processModel.result.business;

    var activeRoomNum = '0';

    const rooms = {
      byId: {},
      allIds: [],
    };

    let id = -1;

    processModel.units.map((v, i) => {
      // console.log('unit v', v, i);
      if (v.parentId > 0) {
        return false;
      }

      ++id;

      // acdescriptiontiveRoomNum = 1;

      const roomPhotos = {
        byId: {
          '0': null,
        },
        allIds: ['0'],
      };

      let photoId = 0;

      v.files.map((v) => {
        ++photoId;
        roomPhotos.allIds.push(photoId);
        roomPhotos.byId[photoId] = fromJS({ data: v.data, modelId: v.id });
      });

      // console.log('v desc ', v.description);

      rooms.allIds.push(`${id}`);
      rooms.byId[`${id}`] = {
        roomName: v.name,
        roomDescription: v.description,
        roomNumRooms: v.numRooms,
        roomBedsKing: Number(v.bedsKing),
        roomBedsQueen: Number(v.bedsQueen),
        roomBedsSimple: Number(v.bedsSimple),
        roomNumPeople: v.maxPersons,
        roomModelId: v.id,
        roomSize: v.roomSize,
        roomSizeMeasure: '',
        roomEquipment: v.equipment,
        roomPhotos: fromJS(roomPhotos),
        roomPrice: parseInt(v.rate),
        roomCurrency: v.currency,
        roomDiscount: parseInt(v.discount),
        isDeleted: false,
        isNew: true,
      };
    });

    activeRoom = rooms.byId['0'];

    if (activeRoom) {
      return state
        .set('rooms', fromJS(rooms))
        .set('roomPhotos', activeRoom.roomPhotos ? activeRoom.roomPhotos : [])
        .set('activeRoom', activeRoomNum)
        .set(
          'roomModelId',
          activeRoom.roomModelId ? activeRoom.roomModelId : '',
        )
        .set('roomName', activeRoom.roomName ? activeRoom.roomName : '')
        .set('roomDescription', activeRoom.roomDescription ? activeRoom.roomDescription : '')
        .set(
          'roomNumRooms',
          activeRoom.roomNumRooms ? activeRoom.roomNumRooms : '',
        )
        .set(
          'roomBedsKing',
          activeRoom.roomBedsKing ? activeRoom.roomBedsKing : '',
        )
        .set(
          'roomBedsQueen',
          activeRoom.roomBedsQueen ? activeRoom.roomBedsQueen : '',
        )
        .set(
          'roomBedsSimple',
          activeRoom.roomBedsSimple ? activeRoom.roomBedsSimple : '',
        )
        .set(
          'roomNumPeople',
          activeRoom.roomNumPeople ? activeRoom.roomNumPeople : '',
        )
        .set('roomSize', activeRoom.roomSize ? activeRoom.roomSize : '')
        .set(
          'roomSizeMeasure',
          activeRoom.roomSizeMeasure ? activeRoom.roomSizeMeasure : '',
        )
        .set(
          'roomEquipment',
          activeRoom.roomEquipment ? fromJS(activeRoom.roomEquipment) : '',
        )
        .set('roomPrice', activeRoom.roomPrice ? activeRoom.roomPrice : '')
        .set('roomCurrency', activeRoom.roomCurrency ? activeRoom.roomCurrency : 'USD')
        .set(
          'roomDiscount',
          activeRoom.roomDiscount ? activeRoom.roomDiscount : '',
        );
    }
    return state;
  default:
    return state;
  }
}

export default businessAddBedroomsReduxReducer;
