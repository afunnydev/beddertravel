import { changeAsdAction, dsaAction } from './actions';
import { makeSelectAsd } from './selectors'; //{ makeSelectPhotosDialog,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //photosdialog: makeSelectPhotosDialog(),

  asd: makeSelectAsd(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,

    dsa: evt => {
      dispatch(dsaAction(evt.target.value));
    },
    onChangeAsd: evt => {
      dispatch(changeAsdAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
