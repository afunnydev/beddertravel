// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';

import request from 'utils/request';
import { USER_LOGIN } from './constants';
import { userLoginErrorAction, userLoginSuccessAction } from './actions';

import { makeSelectPassword, makeSelectUsername } from './selectors';

export function* makeLogin() {
  // const username = yield select(makeSelectUsername());
  // const password = yield select(makeSelectPassword());
  // const requestURL = `http://bedder.omg/app_dev.php/api/v1/user/token`;
  // try {
  //   const res = yield call(request, requestURL, {
  //     method: 'POST',
  //     headers: {
  //       'Content-Type': 'application/json'
  //     },
  //     body: JSON.stringify({
  //       email: username,
  //       password: password,
  //     })
  //   });
  //   yield put(userLoginSuccessAction(res));
  // } catch (err) {
  //   yield put(userLoginErrorAction(err));
  // }
}

export default function* defaultSaga() {
  // yield takeLatest(USER_LOGIN, makeLogin);
}
