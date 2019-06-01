// import { take, call, put, select } from 'redux-saga/effects';
import { call, put, select, takeLatest } from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';
import request from 'utils/request';
import { SUBMIT } from '../DrawerDialogPropainer/constants';
import { changeSubmitErrorAction, changeSubmitResultAction } from '../DrawerDialogPropainer/actions';

export function* saveSettings(action) {
  const settings = action.submit;

  // const payload = action.payload;
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/settings?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      body: JSON.stringify({
        settings: settings,
      })
    });

    yield put(changeSubmitResultAction(res));
    if(res.result && res.result.id && res.result.id > 0) {
      Bedder.setUser(res.result);
    }
  } catch (err) {
    yield put(changeSubmitErrorAction(err));
  }
}
//


// Individual exports for testing
export default function* defaultSaga() {
  // yield takeLatest(SUBMITSAVE, makeSubmitSave);
  // yield takeLatest(SUBMITGET, makeGetBooking);
  yield takeLatest(SUBMIT, saveSettings);
}
