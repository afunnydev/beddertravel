import React from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import saga from './saga';

import DialogTitle from '@material-ui/core/DialogTitle';
import DialogContent from '@material-ui/core/DialogContent';
import DialogActions from '@material-ui/core/DialogActions';
import Dialog from '@material-ui/core/Dialog';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';

import BedderValidator from 'bedder/bedderValidator';
import { Validation } from 'react-validation-framework';

import SupportTicketPropainer, {withConnect as withConnectSupportTicket} from './SupportTicketPropainer';
import ErrorResult from 'components/ErrorResult';
import ErrorNetwork from 'components/ErrorNetwork';
import MessageResult from 'components/MessageResult';

/* eslint-disable react/prefer-stateless-function */
class SupportTicket extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      refresh: false,
      success: false,
    };
    this.vRefs = BedderValidator.makeRefs(BedderValidator.getSupportTicket());
    this.sendST = this.sendST.bind(this);
    this.close = this.close.bind(this);
  }

  sendST() {
    // console.log('ST props', this.props);
    if(BedderValidator.validate(this.vRefs)) {
      this.props.onChangeType({
        businessId: this.props.businessId,
        ticketType: this.props.ticketType,
      });
      this.props.submit();
    }
  }

  clean() {
    this.props.onChangeSubjectVal(' ');
    this.props.onChangeMessageVal(' ');
    this.props.onChangeSubmitError(null);
    this.props.onChangeSubmitResult(null);
    this.props.onChangeType({});
    // console.log('clean job', this.vRefs);
  }

  close() {
    this.clean();
    this.setState({refresh: !this.state.refresh, success: false});
    this.props.closeFn();
  }

  componentDidUpdate(prevProps) {
    if(prevProps.submitResult != this.props.submitResult) {
      if(this.props.submitResult && this.props.submitResult.result && this.props.submitResult.result.id && this.props.submitResult.result.id > 0) {
        this.clean();
        this.setState({success: true});
      }
    }
  }

  render() {
    const vs = BedderValidator.getValidators();
    const backdropClick = !this.props.backdropClick;

    return (
      <Dialog
        disableBackdropClick={backdropClick}
        disableEscapeKeyDown
        maxWidth="xs"
        open={this.props.isOpen}
        onClose={this.props.closeFn}
      >
        <SupportTicketPropainer/>
        <DialogTitle>
          Report
        </DialogTitle>
        <DialogContent>

          <div style={{ margin: 10 }}>
            <ErrorResult result={this.props.submitResult} />
            <ErrorNetwork error={this.props.submitError} />
          </div>
          <Grid container>
            <Grid item xs={12}>
              Subject
            </Grid>
            <Grid item xs={12}>
              <Validation
                componentTag="TextField"
                ref={this.vRefs.subject}
                onChangeCallback="onChange"
                validators={[vs.notEmpty]}
              >
                <TextField
                  fullWidth
                  name="subject"
                  onChange={this.props.onChangeSubject}
                  value={this.props.subject}
                />
              </Validation>
            </Grid>
            <Grid item xs={12} style={{ marginTop: 15 }}>
              Message
            </Grid>
            <Grid item xs={12}>
              <Validation
                componentTag="TextField"
                ref={this.vRefs.message}
                onChangeCallback="onChange"
                validators={[vs.notEmpty]}
              >
                <TextField
                  fullWidth
                  multiline
                  rows={3}
                  name="message"
                  onChange={this.props.onChangeMessage}
                  value={this.props.message}
                />
              </Validation>
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          {this.state.success && (
            <MessageResult message="Message sent!" />
          )}
          <Button disabled={this.props.submitting} onClick={this.close} color="primary">
            {this.state.success && ('OK')}
            {!this.state.success && ('Cancel')}
          </Button>
          {this.state.success || (
            <Button disabled={this.props.submitting} onClick={this.sendST} color="primary">
              Send
            </Button>
          )}
        </DialogActions>
      </Dialog>
    );
  }
}
SupportTicket.defaultProps = {
  backdropClick: false,
  ticketType: 1
};

SupportTicket.propTypes = {};

const withSaga = injectSaga({ key: 'supportTicket', saga });
const withConnect = connect(
  null,
  null,
);

export default compose(withConnect, withSaga, withConnectSupportTicket)(SupportTicket);
