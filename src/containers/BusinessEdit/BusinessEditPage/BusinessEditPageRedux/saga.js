// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';
import request from 'utils/request';

import {
  SUBMIT,
  SUBMIT_MODEL,
} from './constants';

import {
  changeResultAction,
  changeErrorAction,
  changeModelErrorAction,
  changeModelResultAction,
  changeSubmittingAction,
} from './actions';

import {
  makeSelectModelId,
  makeSelectModelStatus,
} from './selectors';

import {
  makeSelectRoomNumPeople,
  makeSelectRoomNumRooms,
  makeSelectRoomPrice,
  makeSelectRooms,
} from '../../BusinessEditBedroomsRedux/selectors';

import {
  processModelAction,
} from '../../BusinessEditGeneralInformationRedux/actions';

import {
  makeSelectLocation,
  makeSelectLocationLat,
  makeSelectLocationLng,
  makeSelectMood,
  makeSelectPropertyType,
  makeSelectAmenities,
  makeSelectName,
  makeSelectStars,
  makeSelectOpinionStrong,
  makeSelectOpinionWeak,
  makeSelectAround,
  makeSelectHowToFind, 
  makeSelectActivities, 
  makeSelectCoverPhotos,
} from '../../BusinessEditGeneralInformationRedux/selectors';

export function* makeGetBusiness() {
  const modelId = yield select(makeSelectModelId());

  const requestURL = `${BedderConfig.getApiUrl()}/business/${modelId}?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
    });
    console.log('RES', res);
    yield put(changeModelResultAction(res));
    console.log('ABOUT TO PROCESS MODEL');
    console.log(processModelAction(res.result));
    yield put(processModelAction(res.result));
  } catch (err) {
    console.log('ERROR', err);
    yield put(changeModelErrorAction(err));
  }
}

export function* makeSubmit() {

  const modelId = yield select(makeSelectModelId());

  const name = yield select(makeSelectName());
  const mood = yield select(makeSelectMood());
  const type = yield select(makeSelectPropertyType());
  const amenities = yield select(makeSelectAmenities());
  const address = yield select(makeSelectLocation());
  const lat = yield select(makeSelectLocationLat());
  const lon = yield select(makeSelectLocationLng());
  const stars = yield select(makeSelectStars());

  const opinionStrong = yield select(makeSelectOpinionStrong());
  const opinionWeak = yield select(makeSelectOpinionWeak());
  const around = yield select(makeSelectAround());
  const howToFind = yield select(makeSelectHowToFind());

  const rate = yield select(makeSelectRoomPrice());
  const sameUnitsAmount = yield select(makeSelectRoomNumRooms());
  const maxPersons = yield select(makeSelectRoomNumPeople());

  const rooms = yield select(makeSelectRooms());

  const modelStatus = yield select(makeSelectModelStatus());

  const activities = yield select(makeSelectActivities());
  const coverPhotos = yield select(makeSelectCoverPhotos());

  const country = 'CD';
  const city = 'dummy';

  const requestURL = `${BedderConfig.getApiUrl()}/business/${modelId}?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      body: JSON.stringify({
        status: modelStatus,
        name,
        country,
        city,
        lat,
        lon,
        address,
        rate,
        sameUnitsAmount,
        maxPersons,
        mood,
        propertyType: type,
        amenities: JSON.stringify(amenities),
        rooms: JSON.stringify(rooms),
        stars,
        activities,
        coverPhotos: JSON.stringify(coverPhotos),
        opinionStrong,
        opinionWeak,
        around,
        howToFind,
      }),
    });

    console.log(res);
    yield put(changeSubmittingAction(false));

    // yield put(changeResultAction(res));
    if (res.result && res.result.business && res.result.business.id > 0) {
      // if (res.result && res.result.business && res.result.business.id && res.result.business.id > 0) {
      yield put(changeModelResultAction(res));
    } else {
    }
  } catch (err) {
    yield put(changeErrorAction(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  // Get the current business in view
  yield takeLatest(SUBMIT_MODEL, makeGetBusiness);
  // Save new information for one business
  yield takeLatest(SUBMIT, makeSubmit);
}
