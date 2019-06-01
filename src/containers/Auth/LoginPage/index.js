/**
 *
 * LoginPage
 *
 */

import BedderConfig from 'bedder/bedderConfig';

import MessageError from 'components/MessageError';

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { Link } from 'react-router-dom';

import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import { withStyles } from '@material-ui/core';

import 'whatwg-fetch';

import Bedder from 'bedder/bedder';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import StyledButton from 'components/StyledButton';

import BedderValidator from 'bedder/bedderValidator';
import { Validation } from 'react-validation-framework';

import ErrorNetwork from 'components/ErrorNetwork';

import {
  changePassword,
  changeUsername,
  userLoginAction,
  userLoginSuccessAction,
  userLoginErrorAction,
} from './actions';
import saga from './saga';
import reducer from './reducer';
import {
  makeSelectPassword,
  makeSelectUsername,
  makeSelectSubmitting,
  makeSelectResult,
  makeSelectError,
} from './selectors';
BedderValidator.prepareTextField();

const styles = () => ({
  white: {
    color: 'white',
  },
  fieldContainer: {
    marginBottom: '10px',
  },
});

const WhiteText = styled.div`
  color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  font-weight: 300;
`;

const WhiteA = styled.div`
  text-decoration: underline;
  color: #fff;
  padding-top: 10px;
  padding-bottom: 10px;
  display: block;
  font-size: 12pt;
  & > a {
    color: #fff;
  }
`;

/* eslint-disable react/prefer-stateless-function */
export class LoginPage extends React.Component {
  constructor(props) {
    super(props);
    this.submit = this.submit.bind(this);
    this.vRefs = BedderValidator.makeRefs(BedderValidator.getLoginPage());
  }

  componentDidUpdate() {
    if (this.props.result && this.props.result.token) {
      // Bedder.setToken(this.props.result.token);
      // this.dispatch(userLoginAction(true));
      this.props.history.push('/home');
      // todo set result to null?
    }
  }

  submit() {
    if (BedderValidator.validate(this.vRefs)) {
      this.props.handleSubmit();
    }
  }

  render() {
    const { classes } = this.props;
    const vs = BedderValidator.getValidators();
    return (
      <React.Fragment>
        <Helmet>
          <title>Login</title>
        </Helmet>
        <WhiteText>
          Sign In
        </WhiteText>
        <form onSubmit={this.props.handleSubmit}>
          <div className={classes.fieldContainer}>
            <Validation
              componentTag="TextField"
              ref={this.vRefs.email}
              onChangeCallback="onChange"
              validators={[vs.isEmail]}
            >
              <TextField
                id="username"
                label="Enter your email address"
                value={this.props.username}
                onChange={this.props.onChangeUsername}
                InputProps={{
                  classes: {
                    root: classes.white,
                    input: classes.white,
                  },
                }}
                InputLabelProps={{
                  classes: {
                    root: classes.white,
                  },
                }}
                fullWidth
              />
            </Validation>
          </div>

          <div className={classes.fieldContainer}>
            <Validation
              componentTag="TextField"
              ref={this.vRefs.password}
              onChangeCallback="onChange"
              validators={[vs.notEmpty]}
            >
              <TextField
                id="password"
                label="Enter your password"
                type="password"
                value={this.props.password}
                onChange={this.props.onChangePassword}
                // error={(this.props.result && this.props.result.error) ? true : false}
                InputProps={{
                  classes: {
                    root: classes.white,
                    input: classes.white,
                  },
                }}
                InputLabelProps={{
                  className: classes.white,
                }}
                fullWidth
              />
            </Validation>
          </div>

          <div>
            {this.props.result &&
              this.props.result.error &&
              this.props.result.error.code == 401 && (
              <MessageError
                error="Please double check your email and your password"
                style={{ marginBottom: 20 }}
              />
            )}
            {!this.props.result && !this.props.error && (
              <Typography>&nbsp;</Typography>
            )}
          </div>

          <ErrorNetwork error={this.props.error} />

          <StyledButton
            type="submit"
            disabled={this.props.submitting}
            fullWidth
            onClick={this.submit}
          >
            {this.props.submitting ? <CircularProgress size={20} classes={{ circle: classes.white }} /> : 'Sign In'}
          </StyledButton>

          <WhiteA>
            <Link to="/auth/forgot">Forgot your password?</Link>
          </WhiteA>
        </form>
      </React.Fragment>
    );
  }
}

LoginPage.propTypes = {
  onChangeUsername: PropTypes.func.isRequired,
  onChangePassword: PropTypes.func.isRequired,
  handleSubmit: PropTypes.func.isRequired,
  username: PropTypes.string,
  password: PropTypes.string,
  submitting: PropTypes.bool,
  error: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
  result: PropTypes.oneOfType([PropTypes.object, PropTypes.bool]),
};

const mapStateToProps = createStructuredSelector({
  username: makeSelectUsername(),
  password: makeSelectPassword(),
  submitting: makeSelectSubmitting(),
  error: makeSelectError(),
  result: makeSelectResult(),
});

function submitThunk() {
  return function(dispatch, getState) {
    const username = makeSelectUsername()(getState());
    const password = makeSelectPassword()(getState());

    if (username.length > 0 && password.length > 0) {
      dispatch(userLoginAction());

      fetch(`${BedderConfig.getApiUrl()}/user/token`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: username,
          password,
        }),
      })
        .then(response => response.json())
        .then(res => {
          // console.log('res', res);

          dispatch(userLoginSuccessAction(res));

          if (res.token) {
            Bedder.setToken(res.token);
            Bedder.setUser(res.user);
            Bedder.login(dispatch);
            // console.log('setting mf token for user ', res.user);
            // dispatch(appContextUserLoginAction(res.user));
          } else {
            dispatch(userLoginSuccessAction(res));
            // dispatch(userLoginErrorAction('Oups, there\'s been an error in your email or your password. Please double check.'));
          }
        })
        .catch(error => {
          // console.log('should errror here', error);
          dispatch(userLoginErrorAction(error));
        });
    }

    return Promise.resolve();
  };
}

function mapDispatchToProps(dispatch, ownProps) {
  return {
    onChangeUsername: evt => dispatch(changeUsername(evt.target.value)),
    onChangePassword: evt => dispatch(changePassword(evt.target.value)),
    handleSubmit: () => dispatch(submitThunk()),
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'loginPage', reducer });
const withSaga = injectSaga({ key: 'loginPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withStyles(styles),
)(LoginPage);
