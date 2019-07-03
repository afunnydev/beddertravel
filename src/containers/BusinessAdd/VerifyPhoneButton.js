import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

import MessageError from 'components/MessageError';
import SubmitButtonText from 'components/SubmitButtonText';

const VERIFY_PHONE_MUTATION = gql`
  mutation VERIFY_PHONE_MUTATION($code: String!, $number: String!) {
    verifyPhone(code: $code, number: $number) {
      message
    }
  }
`;

const VerfiyPhoneButton = ({ verificationCode, saveToState, ownerPhone, handleVerifyPhone }) => (
  <Mutation
    mutation={VERIFY_PHONE_MUTATION}
    variables={{
      code: verificationCode,
      number: ownerPhone,
    }}
  >
    {(verifyPhone, { error, loading }) => (
      <React.Fragment>
        <TextField
          fullWidth
          label="Enter your verification code"
          id="verificationCode"
          name="verificationCode"
          value={verificationCode}
          onChange={saveToState}
          InputLabelProps={{
            shrink: true,
          }}
          helperText={`We sent a verification code to ${ownerPhone}`}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleVerifyPhone(verifyPhone)}
          disabled={loading}
          style={{ marginTop: 20 }}
        >
          <SubmitButtonText loading={loading} text="Validate" />
        </Button>
        {error && <MessageError error={error} />}
      </React.Fragment>
    )}
  </Mutation>
);

VerfiyPhoneButton.propTypes = {
  verificationCode: PropTypes.string.isRequired,
  saveToState: PropTypes.func.isRequired,
  ownerPhone: PropTypes.string.isRequired,
  handleVerifyPhone: PropTypes.func.isRequired,
};

export default VerfiyPhoneButton;
