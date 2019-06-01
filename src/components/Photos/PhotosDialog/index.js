/**
 *
 * PhotosDialog
 * ??????
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectReducer from 'utils/injectReducer';
import { makeSelectPhotosDialog, makeSelectAsd } from './selectors';
import { changeAsdAction, dsaAction } from './actions';
import { CHANGE_ASD, DSA } from './constants';

import { mapStateToProps, mapDispatchToProps } from './mapProps';

import reducer from './reducer';

import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';

import { withStyles } from '@material-ui/core/styles';

const styles = {

  paperWidthXs: {
    margin: 0,
  },
};


//

/* eslint-disable react/prefer-stateless-function */
export class PhotosDialog extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      open: false,
    };

    // this.state.actualSettings = Object.assign({}, this.state.settings);

    // this.handleApply = this.handleApply.bind(this);

    // console.log('construcrtore', this);

  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false });
  };


  render() {

    // console.log('FILLSCREEN ', this.props)

    // const { fullScreen } = this.props;
    const  fullScreen  = this.props.width == 'xs' || this.props.width == 'sm';
    const { classes } = this.props;

    // console.log('fullScreen ', fullScreen)
    return (
      <React.Fragment>
        <Dialog
          scroll={fullScreen ? "paper" : "body"}

          // maxWidth={false}

          fullScreen={fullScreen}
          // open={this.state.open}
          open={this.props.open}
          onClose={this.handleClose}
          style={{margin: 0, paddingBottom: 56}}
          // fullWidth
          classes={{paperWidthXs: classes.paperWidthXs}}
          // aria-labelledby="responsive-dialog-title"
        >
          <DialogTitle id="responsive-dialog-title">Add Photo</DialogTitle>
          <DialogContent>
            {/* <DialogContentText> */}
              {this.props.children}
            {/* </DialogContentText> */}
          </DialogContent>
          <DialogActions>
            {/* <Button variant="contained" onClick={this.handleClose}>
              Close
            </Button>           */}
            {this.props.actions}
          </DialogActions>
        </Dialog>

      </React.Fragment>
    );
  }
}

PhotosDialog.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'photos', reducer });

export default compose(
  withReducer,
  withConnect,
  withMobileDialog(),
  withStyles(styles),
)(PhotosDialog);

export { withConnect };
