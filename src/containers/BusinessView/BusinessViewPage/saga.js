// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';
import moment from 'moment';

import {
  SUBMITGET,
} from '../BusinessViewProps/BusinessViewPropainerOne/constants';
import {
  changeGetResultModelAction,
  changeGetErrorAction,
} from '../BusinessViewProps/BusinessViewPropainerOne/actions';

import request from 'utils/request';
import { makeSelectModelId } from '../BusinessViewProps/BusinessViewPropainerOne/selectors';
import { MAKEBOOKING } from '../BusinessViewProps/BusinessViewPropainerTwo/constants';
import {
  makeSelectFrom,
  makeSelectNumBed,
  makeSelectNumPeople,
  makeSelectTo,
} from 'containers/SearchBar/SearchBarRedux/selectors';
import { changeBookErrorAction, changeBookResultAction } from '../BusinessViewProps/BusinessViewPropainerTwo/actions';

export function* makeBooking(action) {
  const roomId = action.roomId;
  const numRooms = action.numRooms;
  const stripeToken = action.stripeToken;
  const from = yield select(makeSelectFrom());
  const to = yield select(makeSelectTo());
  const numPeople = yield select(makeSelectNumPeople());
  const numBeds = yield select(makeSelectNumBed());
  // var payload = action.payload;
  var addInfo = {
    numPeople: numPeople,
    numBeds: numBeds,
    numRooms: numRooms,
  };
  var payload = Object.assign(action.payload, addInfo);
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/booking?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Bedder.getHeaderToken(),
      },
      body: JSON.stringify({
        from,
        to,
        businessUnitId: roomId,
        numRooms,
        payload: JSON.stringify(payload),
        stripeToken,
      }),
    });

    yield put(changeBookResultAction(res, roomId));
  } catch (err) {
    yield put(changeBookErrorAction(err, roomId));
  }
}

export function* makeGetBusiness(action) {
  const modelId = yield select(makeSelectModelId());

  const from = yield select(makeSelectFrom());
  const to = yield select(makeSelectTo());
  const numPeople = yield select(makeSelectNumPeople());
  const numBeds = yield select(makeSelectNumBed());

  const requestURL = `${BedderConfig.getApiUrl()}/business/${modelId}/quotes?from=${encodeURIComponent(from.toISOString())}&to=${encodeURIComponent(to.toISOString())}&numBeds=${numBeds}&numPeople=${numPeople}&XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
    });

    yield put(changeGetResultModelAction(res));
  } catch (err) {
    yield put(changeGetErrorAction(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // yield takeLatest(SUBMIT, makeSubmit);
  yield takeLatest(SUBMITGET, makeGetBusiness);
  yield takeLatest(MAKEBOOKING, makeBooking);
}
