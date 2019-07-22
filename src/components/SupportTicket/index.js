import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { Mutation } from 'react-apollo';
import gql from 'graphql-tag';
import { Validation, fieldValidatorCore } from 'react-validation-framework';
import { withSnackbar } from 'notistack';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import BedderValidator from 'bedder/bedderValidator';

const CREATE_TICKET_MUTATION = gql`
  mutation CREATE_TICKET_MUTATION($subject: String!, $message: String!) {
    createTicket(subject: $subject, message: $message) {
      id
    }
  }
`;

const SupportTicket = ({ open, onClose, enqueueSnackbar }) => {
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const vs = BedderValidator.getValidators();

  const sendTicket = async (createTicket) => {
    if (!fieldValidatorCore.checkGroup('supportTicket').isValid) {
      return enqueueSnackbar('Please fill all the required fields.', { variant: 'error' });
    }
    await createTicket();
  };

  const onCompleted = () => {
    enqueueSnackbar('We received your inquiry. We will be in touch shortly.', { variant: 'success' });
    onClose();
  };

  const onError = () => enqueueSnackbar('An error occured. Please try again.', { variant: 'error' });

  return(
    <Dialog
      disableEscapeKeyDown
      maxWidth="xs"
      open={open}
      onClose={onClose}
    >
      <DialogTitle>Support</DialogTitle>
      <DialogContent>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Validation
              group="supportTicket"
              componentTag="TextField"
              onChangeCallback="onChange"
              validators={[vs.notEmpty]}
            >
              <TextField
                fullWidth
                name="subject"
                onChange={(e) => setSubject(e.target.value)}
                value={subject}
                label="Subject"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Validation>
          </Grid>

          <Grid item xs={12}>
            <Validation
              group="supportTicket"
              componentTag="TextField"
              onChangeCallback="onChange"
              validators={[vs.notEmpty]}
            >
              <TextField
                fullWidth
                multiline
                rows={3}
                name="message"
                onChange={(e) => setMessage(e.target.value)}
                value={message}
                label="Message"
                InputLabelProps={{
                  shrink: true
                }}
              />
            </Validation>
          </Grid>
        </Grid>
      </DialogContent>
      <DialogActions>
        <Mutation
          mutation={CREATE_TICKET_MUTATION}
          variables={{
            subject,
            message,
          }}
          onCompleted={onCompleted}
          onError={onError}
        >
          {( createTicket, { loading }) => (
            <>
              <Button disabled={loading} onClick={onClose} color="primary">Cancel</Button>
              <Button disabled={loading} onClick={() => sendTicket(createTicket)} color="primary">
                Send
              </Button>
            </>
          )}
        </Mutation>
      </DialogActions>
    </Dialog>
  );
};

SupportTicket.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  enqueueSnackbar: PropTypes.func.isRequired,
};

export default withSnackbar(SupportTicket);
