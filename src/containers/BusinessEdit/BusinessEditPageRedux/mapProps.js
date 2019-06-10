import {
  changeResultAction,
  changeErrorAction,
  changeValidationErrorAction,
  changeSubmittingAction,
  changeModelIdAction,
  submitAction,
  submitModelAction,
  changeModelStatusAction,
  changeModelResultAction,
  changeModelErrorAction,
} from './actions';
import {
  makeSelectBusinessEditPageRedux,
  makeSelectResult,
  makeSelectError,
  makeSelectValidationError,
  makeSelectSubmitting,
  makeSelectModelId,
  makeSelectModelResult,
  makeSelectModelError,
  makeSelectModelStatus,
} from './selectors';
import { createStructuredSelector } from 'reselect';
import {
  cloneRoomAction,
} from '../BusinessEditBedroomsRedux/actions';
import { changeModelIdThunk } from '../BusinessEditPage/thunk';

const mapStateToProps = createStructuredSelector({
  businessaddpageredux: makeSelectBusinessEditPageRedux(),

  result: makeSelectResult(),
  error: makeSelectError(),
  validationError: makeSelectValidationError(),
  submitting: makeSelectSubmitting(),
  modelId: makeSelectModelId(),
  modelStatus: makeSelectModelStatus(),
  modelResult: makeSelectModelResult(),
  modelError: makeSelectModelError(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    submit: evt => {
      // not clone but copy
      dispatch(cloneRoomAction());
      dispatch(submitAction(evt.target.value));
    },
    submitDraft: evt => {
      dispatch(cloneRoomAction());
      dispatch(changeModelStatusAction('draft'));
      dispatch(submitAction(evt));
    },
    submitPublic: evt => {
      dispatch(cloneRoomAction());
      dispatch(changeModelStatusAction('public'));
      dispatch(submitAction(evt));
    },
    changeModelStatus: evt => {
      dispatch(changeModelStatusAction(evt));
    },
    submitModel: evt => {
      // not clone but copy
      // dispatch(cloneRoomAction());
      dispatch(submitModelAction(evt));
    },
    onChangeModelIdThunk: evt => {
      dispatch(changeModelIdThunk(evt));
    },
    onChangeResult: evt => {
      dispatch(changeResultAction(evt));
    },
    onChangeError: evt => {
      dispatch(changeErrorAction(evt));
    },
    onChangeValidationError: evt => {
      dispatch(changeValidationErrorAction(evt));
    },
    onChangeModelId: modelId => {
      dispatch(changeModelIdAction(modelId));
    },
    onChangeModelResult: modelResult => {
      dispatch(changeModelResultAction(modelResult));
    },
    onChangeModelError: modelError => {
      dispatch(changeModelErrorAction(modelError));
    },
    onChangeSubmitting: evt => {
      dispatch(changeSubmittingAction(evt));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
