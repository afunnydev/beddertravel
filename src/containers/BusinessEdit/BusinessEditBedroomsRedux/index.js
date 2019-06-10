import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  selectPhotoAction,
} from './actions';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class BusinessEditBedroomsRedux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelResultId: null,
    };
  }

  componentWillUnmount() {
    this.props.dispatch(selectPhotoAction());
  }

  processModel() {
    if (this.props.modelResult) {
      if (
        this.props.modelResult.result &&
        this.props.modelResult.result.business &&
        this.props.modelResult.result.business.id > 0
      ) {
        this.setState({modelResultId: this.props.modelResult.result.business.id});
        this.props.processModel(this.props.modelResult);
      }
    }
  }

  componentDidMount() {
    this.processModel();
  }

  componentDidUpdate(prevProps) {
    if (prevProps.modelResult !== this.props.modelResult) {
      this.processModel();
    }
  }

  render() {
    return <React.Fragment />;
  }
}

BusinessEditBedroomsRedux.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'businessEditBedroomsRedux', reducer });
const withSaga = injectSaga({ key: 'businessEditBedroomsRedux', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BusinessEditBedroomsRedux);

export { withConnect };
