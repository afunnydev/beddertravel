// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';

import {
  SUBMIT,
  SUBMIT_MODEL,
} from '../BusinessEditPageRedux/constants';
import {
  changeResultAction,
  changeErrorAction,
  changeModelErrorAction,
  changeModelResultAction,
} from '../BusinessEditPageRedux/actions';

import request from 'utils/request';
import {
  makeSelectRoomNumPeople,
  makeSelectRoomNumRooms,
  makeSelectRoomPrice,
  makeSelectRooms,
} from '../BusinessEditBedroomsRedux/selectors';
import {
  makeSelectLocation,
  makeSelectLocationLat,
  makeSelectLocationLng,
  makeSelectMood,
  makeSelectPropertyType,
  makeSelectAmenities,
  makeSelectName,
  makeSelectEmail,
  makeSelectStars,
  makeSelectOpinionStrong,
  makeSelectOpinionWeak,
  makeSelectAround,
  makeSelectHowToFind, makeSelectActivities, makeSelectCoverPhoto,
} from '../BusinessEditGeneralInformationRedux/selectors';

import {
  makeSelectModelId,
  makeSelectModelStatus,
} from '../BusinessEditPageRedux/selectors';

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

    yield put(changeModelResultAction(res));
  } catch (err) {
    yield put(changeModelErrorAction(err));
  }
}

export function* makeSubmit() {

  // if(BedderValidator.validate(this.vRefs)) {}

  const modelId = yield select(makeSelectModelId());

  const name = yield select(makeSelectName());
  const email = yield select(makeSelectEmail());
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
  const coverPhoto = yield select(makeSelectCoverPhoto());

  const contactName = 'dummy';
  const phone = 'dummy';
  const country = 'CD';
  const city = 'dummy';

  if (modelId > 0) {
    var requestURL = `${BedderConfig.getApiUrl()}/business/${modelId}?XDEBUG_SESSION_START=phpstorm`;
  } else {
    var requestURL = `${BedderConfig.getApiUrl()}/business?XDEBUG_SESSION_START=phpstorm`;
  }

  try {
    const res = yield call(request, requestURL, {
      method: modelId > 0 ? 'PUT' : 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      body: JSON.stringify({
        status: modelStatus,
        name,
        contactName,
        phone,
        country,
        email,
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
        coverPhoto,
        opinionStrong,
        opinionWeak,
        around,
        howToFind,
      }),
    });

    yield put(changeResultAction(res));
    if (res.result && res.result.business && res.result.business.id > 0) {
      // if (res.result && res.result.business && res.result.business.id && res.result.business.id > 0) {
      yield put(changeModelResultAction(res));
    } else {
      // console.log('wait whut???', res);
    }
  } catch (err) {
    yield put(changeErrorAction(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SUBMIT, makeSubmit);
  yield takeLatest(SUBMIT_MODEL, makeGetBusiness);
}
