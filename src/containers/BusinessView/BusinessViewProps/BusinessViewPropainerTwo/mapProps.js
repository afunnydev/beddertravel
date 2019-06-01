import {
  changeBookedListAction,
  changeBookResultAction,
  changeBookErrorAction,
  makeBookingAction,
} from './actions';
import {
  makeSelectBookedList,
  makeSelectBookResult,
  makeSelectBookError, makeSelectBookSubmitting,
} from './selectors'; //{ makeSelectBusinessViewPropainerTwo,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //businessviewpropainertwo: makeSelectBusinessViewPropainerTwo(),

  bookedList: makeSelectBookedList(),
  bookResult: makeSelectBookResult(),
  bookError: makeSelectBookError(),
  bookSubmitting: makeSelectBookSubmitting(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    onSubmit: evt => {
      // console.log('fackyeah', evt);
    },
    clearBooking: (roomId) => {
      // console.log('wtf room id', roomId);
      dispatch(changeBookResultAction(null, roomId));
      dispatch(changeBookErrorAction(null, roomId));
    },
    makeBooking: (roomId,numRooms,payload,stripeToken) => {
      // console.log('evt', evt)
      dispatch(makeBookingAction(roomId,numRooms,payload,stripeToken));
    },
    onChangeBookedList: evt => {
      dispatch(changeBookedListAction(evt));
    },
    onChangeBookResult: evt => {
      dispatch(changeBookResultAction(evt));
    },
    onChangeBookError: evt => {
      dispatch(changeBookErrorAction(evt));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
