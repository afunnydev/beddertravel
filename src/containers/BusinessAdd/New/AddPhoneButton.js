import React from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';

import Button from '@material-ui/core/Button';

import MessageError from 'components/MessageError';
import SubmitButtonText from 'components/SubmitButtonText';

const ADD_PHONE_MUTATION = gql`
  mutation ADD_PHONE_MUTATION($number: String!) {
    addPhone(number: $number) {
      message
    }
  }
`;

const AddPhoneButton = ({ ownerPhone, handleValidatePhone }) => (
  <Mutation
    mutation={ADD_PHONE_MUTATION}
    variables={{
      number: ownerPhone,
    }}
  >
    {(addPhone, { error, loading }) => (
      <React.Fragment>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleValidatePhone(addPhone)}
          disabled={loading}
        >
          <SubmitButtonText loading={loading} text="Validate Phone" />
        </Button>
        {error && <MessageError error={error} />}
      </React.Fragment>
    )}
  </Mutation>
);

AddPhoneButton.propTypes = {
  ownerPhone: PropTypes.string.isRequired,
  handleValidatePhone: PropTypes.func.isRequired,
};

export default AddPhoneButton;
