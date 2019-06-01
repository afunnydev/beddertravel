import {
  changeBookedListAction,
  changeBookResultAction,
  changeBookErrorAction,
  makeBookingAction,
} from './actions';
import {
  makeSelectBookedList,
  makeSelectBookResult,
  makeSelectBookError,
} from './selectors'; //{ makeSelectBusinessViewPropainerTwo,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //businessviewpropainertwo: makeSelectBusinessViewPropainerTwo(),

  bookedList: makeSelectBookedList(),
  bookResult: makeSelectBookResult(),
  bookError: makeSelectBookError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    makeBooking: evt => {
      dispatch(makeBookingAction(evt.target.value));
    },
    onChangeBookedList: evt => {
      dispatch(changeBookedListAction(evt.target.value));
    },
    onChangeBookResult: evt => {
      dispatch(changeBookResultAction(evt.target.value));
    },
    onChangeBookError: evt => {
      dispatch(changeBookErrorAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
