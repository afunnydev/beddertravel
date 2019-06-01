// import { take, call, put, select } from 'redux-saga/effects';
import {
  call, put, select, takeLatest,
} from 'redux-saga/effects';
import Bedder from 'bedder/bedder';
import BedderConfig from 'bedder/bedderConfig';
import request from 'utils/request';
import { makeSelectModelId } from '../BookingProps/BookingPropainerOne/selectors';
import { changeGetErrorAction, changeGetResultModelAction } from '../BookingProps/BookingPropainerOne/actions';
import { SUBMITGET } from '../BookingProps/BookingPropainerOne/constants';

// import {
//   SUBMITGET,
// } from '../BookingProps/BookingPropainerOne/constants';
// import {
//   changeGetResultModelAction,
//   changeGetErrorAction,
// } from '../BookingProps/BookingPropainerOne/actions';
//
// import { makeSelectModelId } from '../BookingProps/BookingPropainerOne/selectors';
// import { MAKEBOOKING } from '../BookingProps/BookingPropainerTwo/constants';
// import { makeSelectFrom, makeSelectTo } from 'containers/SearchBar/SearchBarRedux/selectors';
// import { changeBookErrorAction, changeBookResultAction } from '../BookingProps/BookingPropainerTwo/actions';

// export function* makeBooking(action) {
//   const roomId = action.roomId;
//   const numRooms = action.numRooms;
//   const from = yield select(makeSelectFrom());
//   const to = yield select(makeSelectTo());
//   const payload = action.payload;
//   console.log('action', action);
//
//   const requestURL = `${BedderConfig.getApiUrl()}/booking?XDEBUG_SESSION_START=phpstorm`;
//
//   try {
//     const res = yield call(request, requestURL, {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': Bedder.getHeaderToken(),
//       },
//       body: JSON.stringify({
//         from: from,
//         to: to,
//         businessUnitId: roomId,
//         numRooms: numRooms,
//         payload: payload,
//       })
//     });
//
//     yield put(changeBookResultAction(res, roomId));
//   } catch (err) {
//     yield put(changeBookErrorAction(err, roomId));
//   }
// }
//
export function* makeGetBooking(action) {
  const modelId = yield select(makeSelectModelId());
  // console.log('action', action);

  const requestURL = `${BedderConfig.getApiUrl()}/booking/${modelId}?XDEBUG_SESSION_START=phpstorm`;

  try {
    const res = yield call(request, requestURL, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: Bedder.getHeaderToken(),
      },
      // body: JSON.stringify({

      // })
    });

    yield put(changeGetResultModelAction(res));
  } catch (err) {
    yield put(changeGetErrorAction(err));
  }
}


// Individual exports for testing
export default function* defaultSaga() {
  // yield takeLatest(SUBMIT, makeSubmit);
  yield takeLatest(SUBMITGET, makeGetBooking);
  // yield takeLatest(MAKEBOOKING, makeBooking);
}
