// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';
// import { makeSelectModelId } from '../BookingProps/BookingPropainerOne/selectors';
// import { changeGetErrorAction, changeGetResultAction } from '../BookingProps/BookingPropainerOne/actions';
// import { SUBMITGET } from '../BookingProps/BookingPropainerOne/constants';

// import {
//   SUBMITGET,
// } from '../BookingProps/BookingPropainerOne/constants';
// import {
//   changeGetResultModelAction,
//   changeGetErrorAction,
// } from '../BookingProps/BookingPropainerOne/actions';
//
import request from 'utils/request';

export function* makeSubmitSave(action) {
  const firstname = yield select(makeSelectFirstname());
  const lastname = yield select(makeSelectLastname());
  const phone = yield select(makeSelectPhone());
  const about = yield select(makeSelectAbout());
  const email = yield select(makeSelectEmail());
  const photos = yield select(makeSelectPhotos());
  const newPassword = yield select(makeSelectNewPassword());
  const oldPassword = yield select(makeSelectOldPassword());

  // const payload = action.payload;
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/user?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        phone: phone,
        about: about,
        email: email,
        photos: photos,
        newPassword: newPassword,
        oldPassword: oldPassword,
      })
    });

    yield put(changeSubmitSaveResultAction(res));
  } catch (err) {
    yield put(changeSubmitSaveErrorAction(err));
  }
}
//
export function* getProfile(action) {
  // const modelId = yield select(makeSelectModelId());
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/user?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      // body: JSON.stringify({

      // })
    });

    yield put(changeSubmitResultAction(res));
    yield put(processAction(res));
  } catch (err) {
    yield put(changeSubmitErrorAction(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SUBMITSAVE, makeSubmitSave);
  // yield takeLatest(SUBMITGET, makeGetBooking);
  yield takeLatest(SUBMIT, getProfile);
}
