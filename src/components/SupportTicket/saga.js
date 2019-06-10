import { call, put, select, takeLatest } from 'redux-saga/effects';

import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';
import request from 'utils/request';

import { SUBMIT } from './SupportTicketPropainer/constants';
import { makeSelectMessage, makeSelectSubject } from './SupportTicketPropainer/selectors';
import { changeSubmitErrorAction, changeSubmitResultAction } from './SupportTicketPropainer/actions';

export function* postST() {
  const subject = yield select(makeSelectSubject());
  const message = yield select(makeSelectMessage());

  const requestURL = `${BedderConfig.getApiUrl()}/supportTicket/new?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': Bedder.getHeaderToken(),
      },
      body: JSON.stringify({
        subject: subject,
        message: message,
      })
    });

    yield put(changeSubmitResultAction(res));
  } catch (err) {
    yield put(changeSubmitErrorAction(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  yield takeLatest(SUBMIT, postST);
}
