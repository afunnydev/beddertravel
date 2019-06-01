import {
  changeSubmitResultAction,
  changeSubmitErrorAction,
  changeSubmittingAction,
  changeSettingsAction,
  changeChangesAction,
  submitAction,
  processAction,
  changeAction,
} from './actions';
import {
  makeSelectSubmitResult,
  makeSelectSubmitError,
  makeSelectSubmitting,
  makeSelectSettings,
  makeSelectChanges,
} from './selectors'; //{ makeSelectDrawerDialogPropainer,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //drawerdialogpropainer: makeSelectDrawerDialogPropainer(),

  submitResult: makeSelectSubmitResult(),
  submitError: makeSelectSubmitError(),
  submitting: makeSelectSubmitting(),
  settings: makeSelectSettings(),
  changes: makeSelectChanges(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    submit: evt => {
      dispatch(submitAction(evt.target.value));
    },
    process: evt => {
      dispatch(processAction(evt.target.value));
    },
    change: evt => {
      dispatch(changeAction(evt.target.value));
    },
    onChangeSubmitResult: evt => {
      dispatch(changeSubmitResultAction(evt.target.value));
    },
    onChangeSubmitError: evt => {
      dispatch(changeSubmitErrorAction(evt.target.value));
    },
    onChangeSubmitting: evt => {
      dispatch(changeSubmittingAction(evt.target.value));
    },
    onChangeSettings: evt => {
      dispatch(changeSettingsAction(evt.target.value));
    },
    onChangeChanges: evt => {
      dispatch(changeChangesAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
