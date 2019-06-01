import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import {
  locationApplyAction,
} from './actions';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';
import saga from './saga';

/* eslint-disable react/prefer-stateless-function */
export class BusinessAddGeneralInformationRedux extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      modelResultId: null,
    };
  }

  componentWillUnmount() {
    this.props.dispatch(locationApplyAction());
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
    return (
      <React.Fragment />
    );
  }
}

BusinessAddGeneralInformationRedux.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({
  key: 'businessAddGeneralInformationRedux',
  reducer,
});
const withSaga = injectSaga({
  key: 'businessAddGeneralInformationRedux',
  saga,
});

export default compose(
  withReducer,
  withSaga,
  withConnect,
)(BusinessAddGeneralInformationRedux);

export { withConnect };
