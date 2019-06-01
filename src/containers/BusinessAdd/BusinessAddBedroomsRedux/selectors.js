import { createSelector } from 'reselect';
import { initialState } from './reducer';

/**
 * Direct selector to the businessAddBedroomsRedux state domain
 */

const selectBusinessAddBedroomsReduxDomain = state =>
  state.get('businessAddBedroomsRedux', initialState);

/**
 * Other specific selectors
 */

/**
 * Default selector used by BusinessAddBedroomsRedux
 */

const makeSelectBusinessAddBedroomsRedux = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, substate =>
    substate.toJS(),
  );

const makeSelectRooms = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('rooms'),
  );
const makeSelectActiveRoom = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('activeRoom'),
  );
const makeSelectRoomName = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomName'),
  );
const makeSelectRoomNumRooms = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomNumRooms'),
  );
const makeSelectRoomBedsKing = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomBedsKing'),
  );
const makeSelectRoomBedsQueen = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomBedsQueen'),
  );
const makeSelectRoomBedsSimple = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomBedsSimple'),
  );
const makeSelectRoomNumPeople = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomNumPeople'),
  );
const makeSelectRoomSize = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomSize'),
  );
const makeSelectRoomSizeMeasure = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomSizeMeasure'),
  );
const makeSelectRoomEquipment = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomEquipment'),
  );
const makeSelectRoomPhotos = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomPhotos'),
  );
const makeSelectRoomPrice = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomPrice'),
  );
const makeSelectRoomDiscount = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomDiscount'),
  );
const makeSelectIsDeleted = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('isDeleted'),
  );
const makeSelectIsNew = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('isNew'),
  );
const makeSelectRoomModelId = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomModelId'),
  );
const makeSelectRoomDescription = () =>
  createSelector(selectBusinessAddBedroomsReduxDomain, state =>
    state.get('roomDescription'),
  );

export default makeSelectBusinessAddBedroomsRedux;
export {
  selectBusinessAddBedroomsReduxDomain,
  makeSelectBusinessAddBedroomsRedux,
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
  makeSelectRoomModelId,
  makeSelectRoomDescription
};
