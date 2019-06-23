import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessEditBedroomsRedux state domain
 */

const selectBusinessEditBedroomsReduxDomain = state =>
  state.get('businessEditBedroomsRedux', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessEditBedroomsRedux
 */

const makeSelectBusinessEditBedroomsRedux = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, substate =>
    substate.toJS(),
  );

const makeSelectRooms = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('rooms'),
  );
const makeSelectActiveRoom = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('activeRoom'),
  );
const makeSelectRoomName = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomName'),
  );
const makeSelectRoomNumRooms = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomNumRooms'),
  );
const makeSelectRoomBedsKing = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomBedsKing'),
  );
const makeSelectRoomBedsQueen = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomBedsQueen'),
  );
const makeSelectRoomBedsSimple = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomBedsSimple'),
  );
const makeSelectRoomNumPeople = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomNumPeople'),
  );
const makeSelectRoomSize = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomSize'),
  );
const makeSelectRoomSizeMeasure = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomSizeMeasure'),
  );
const makeSelectRoomEquipment = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomEquipment'),
  );
const makeSelectRoomPhotos = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomPhotos'),
  );
const makeSelectRoomPrice = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomPrice'),
  );
const makeSelectRoomCurrency = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomCurrency'),
  );
const makeSelectRoomDiscount = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomDiscount'),
  );
const makeSelectIsDeleted = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('isDeleted'),
  );
const makeSelectIsNew = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('isNew'),
  );
const makeSelectRoomModelId = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomModelId'),
  );
const makeSelectRoomDescription = () =>
  createSelector(selectBusinessEditBedroomsReduxDomain, state =>
    state.get('roomDescription'),
  );

export default makeSelectBusinessEditBedroomsRedux;
export {
  selectBusinessEditBedroomsReduxDomain,
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
  makeSelectRoomCurrency,
  makeSelectRoomDiscount,
  makeSelectIsDeleted,
  makeSelectIsNew,
  makeSelectRoomModelId,
  makeSelectRoomDescription
};
