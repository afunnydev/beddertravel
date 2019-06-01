import {
  changeSubmittingAction,
  action1Action,
  action2Action,
} from './actions';
import { makeSelectSubmitting } from './selectors'; //{ makeSelectUserProfilePropainer3,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //userprofilepropainer3: makeSelectUserProfilePropainer3(),

  submitting: makeSelectSubmitting(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    action1: evt => {
      dispatch(action1Action(evt.target.value));
    },
    action2: evt => {
      dispatch(action2Action(evt.target.value));
    },
    onChangeSubmitting: evt => {
      dispatch(changeSubmittingAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
