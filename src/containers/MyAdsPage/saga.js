// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';

import { SUBMIT } from './MyAdsPageRedux/constants';
import { submitAction, changeResultAction, changeErrorAction } from './MyAdsPageRedux/actions';

import request from 'utils/request';
// import {  } from '../MyAdsPageRedux/selectors';

import {
  // makeSelectMyAdsPageRedux,
  makeSelectResult,
  makeSelectError,
  makeSelectSubmitting,
  // makeSelectData,
} from './MyAdsPageRedux/selectors';

export function* makeSubmit() {

    // const name = yield select(makeSelectName());


  const requestURL = BedderConfig.getApiUrl() + '/business/list?XDEBUG_SESSION_START=phpstorm';

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': 'Bearer '+Bedder.getToken(),
      },
      // body: JSON.stringify({

      // })
    });

    yield put(changeResultAction(res));
  } catch (err) {
    yield put(changeErrorAction(err));
  }
}

// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SUBMIT, makeSubmit);
}
