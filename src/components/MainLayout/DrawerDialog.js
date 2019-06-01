import React from 'react';
import { Link } from 'react-router-dom';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Avatar from '@material-ui/core/Avatar';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import Button from '@material-ui/core/Button';

import BgImage from './DrawerHeaderBackground.png';
import ExampleImage from './example.jpg';

import MoodIcon from '@material-ui/icons/Mood';
import PersonIcon from '@material-ui/icons/Person';

import  WithUserContext  from 'containers/AppContext/context';
// import { withContext } from "with-context";

import DrawerDialogPropainer from './DrawerDialogPropainer/Loadable';
import DrawerDialogSaga from './DrawerDialogSaga/Loadable';

import { compose } from 'redux';
import { connect } from 'react-redux';

import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import StyledButton from 'components/StyledButton';
import FormLabel from '@material-ui/core/FormLabel';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import Checkbox from '@material-ui/core/Checkbox';
import TextField from '@material-ui/core/TextField';
import Portal from '@material-ui/core/Portal';

import { withStyles } from '@material-ui/core/styles';

import BedderSetting from 'bedder/bedderSetting';
import { submitAction } from './DrawerDialogPropainer/actions';

const styles = {
  checkboxGrid: {
    textAlign: 'right',
  },
  textInput: {
    width: 30,
  },
};

class DrawerDialog extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      open: false,
      settings: {
        'receiveByEmail': BedderSetting.get('receiveByEmail'),
        'receiveBySMS': BedderSetting.get('receiveBySMS'),
        'receiveReviews': BedderSetting.get('receiveReviews'),
        'receiveBookings': BedderSetting.get('receiveBookings'),
        'receiveNews': BedderSetting.get('receiveNews'),
        'bookingMargin': BedderSetting.get('bookingMargin'),
        'explorersEarning': BedderSetting.get('explorersEarning'),
      },
    };

    this.state.actualSettings = Object.assign({}, this.state.settings);

    this.handleApply = this.handleApply.bind(this);

    // console.log('construcrtore', this);
  }

  handleClickOpen = () => {
    this.setState({ open: true });
  };

  handleClose = () => {
    this.setState({ open: false, settings: Object.assign({}, this.state.actualSettings) });
  };

  handleApply() {
    // console.log('this.state.actualSettings', this.state.actualSettings);

    // console.log('this.state.actualSettings2', this.state.actualSettings);
    this.props.dispatch(submitAction(this.state.settings));
    this.setState({actualSettings: Object.assign({}, this.state.settings), open: false});
    // this.handleClose();
  }

  handleChange = name => event => {
    const { settings } = this.state;
    settings[name] = event.target.checked ? 1 : 0;
    this.setState({ settings });
  };

  handleChangeText = name => event => {
    const { settings } = this.state;
    settings[name] = event.target.value;
    this.setState({ settings });
  };

  // componentWillUnmount(val, val2) {
  //   console.log('componentWillUnmount', val, val2)
  // }

  render() {
    const { fullScreen, classes } = this.props;
    // console.log('this.handleChange', this.handleChange('nameChangeFackYeah'));
    const MenuItemBtn = this.props.btn;
    const isMobile = this.props.width == 'xs' || this.props.width == 'sm';
    const isSuperAdmin = this.props.user && this.props.user.roles && this.props.user.roles.indexOf('ROLE_SUPER_ADMIN') !== -1;
    // console.log('state', this.state);
    // console.log('DrawerDialog props', this.props);
    return (
      <DrawerDialogPropainer>
        <DrawerDialogSaga />
        <MenuItemBtn onClick={this.handleClickOpen}>{this.props.btntext}</MenuItemBtn>
        <Dialog
          fullScreen={fullScreen}
          open={this.state.open}
          onClose={this.handleClose}
          scroll={fullScreen ? "paper" : "body"}
          aria-labelledby="responsive-dialog-title"
          style={isMobile ? {paddingBottom: 56} : {}}
        >
          <DialogTitle id="responsive-dialog-title" style={{textAlign:'center'}}>Manage my alerts</DialogTitle>
          <DialogContent style={{minWidth: 320}}>
            {/*<DialogContentText>*/}
            <Grid container={true}>
              <Grid item={true} xs={9}>
                <FormLabel>Receive by Email</FormLabel>
                <Checkbox style={{opacity: 0}} />
              </Grid>
              <Grid item={true} xs={3} className={classes.checkboxGrid}>
                <Checkbox
                  checked={this.state.settings.receiveByEmail == 1 ? true : false}
                  onChange={this.handleChange('receiveByEmail')}
                  value='receiveByEmail'
                />
              </Grid>
            </Grid>

            <Grid container={true}>
              <Grid item={true} xs={9}>
                <FormLabel>Receive by SMS</FormLabel>
                <Checkbox style={{opacity: 0}} />
              </Grid>
              <Grid item={true} xs={3} className={classes.checkboxGrid}>
                <Checkbox
                  checked={this.state.settings.receiveBySMS == 1 ? true : false}
                  onChange={this.handleChange('receiveBySMS')}
                  value='receiveBySMS'
                />
              </Grid>
            </Grid>
            <Grid container={true}>
              <Grid item={true} xs={9}>
                <FormLabel>Receive Reviews</FormLabel>
                <Checkbox style={{opacity: 0}} />
              </Grid>
              <Grid item={true} xs={3} className={classes.checkboxGrid}>
                <Checkbox
                  checked={this.state.settings.receiveReviews == 1 ? true : false}
                  onChange={this.handleChange('receiveReviews')}
                  value='receiveReviews'
                />
              </Grid>
            </Grid>

            <Grid container={true}>
              <Grid item={true} xs={9}>
                <FormLabel>Receive Bookings</FormLabel>
                <Checkbox style={{opacity: 0}} />
              </Grid>
              <Grid item={true} xs={3} className={classes.checkboxGrid}>
                <Checkbox
                  checked={this.state.settings.receiveBookings == 1 ? true : false}
                  onChange={this.handleChange('receiveBookings')}
                  value='receiveBookings'
                />
              </Grid>
            </Grid>

            <Grid container={true}>
              <Grid item={true} xs={9}>
                <FormLabel>Receive News</FormLabel>
                <Checkbox style={{opacity: 0}} />
              </Grid>
              <Grid item={true} xs={3} className={classes.checkboxGrid}>
                <Checkbox
                  checked={this.state.settings.receiveNews == 1 ? true : false}
                  onChange={this.handleChange('receiveNews')}
                  value='receiveNews'
                />
              </Grid>
            </Grid>

            {isSuperAdmin && (
            <React.Fragment>

              <Typography align="center">OMG you're an surep admin :-)</Typography>

              <Grid container={true}>
                <Grid item={true} xs={9}>
                  <FormLabel>Booking margin %</FormLabel>
                  <Checkbox style={{opacity: 0}} />
                </Grid>
                <Grid item={true} xs={3} className={classes.checkboxGrid}>
                  <TextField
                    value={this.state.settings['bookingMargin']}
                    onChange={this.handleChangeText('bookingMargin')}
                    className={classes.textInput}
                   />
                </Grid>
              </Grid>

              <Grid container={true}>
                <Grid item={true} xs={9}>
                  <FormLabel>Explorer's earning %</FormLabel>
                  <Checkbox style={{opacity: 0}} />
                </Grid>
                <Grid item={true} xs={3} className={classes.checkboxGrid}>
                  <TextField
                    value={this.state.settings['explorersEarning']}
                    onChange={this.handleChangeText('explorersEarning')}
                    className={classes.textInput}
                   />
                </Grid>
              </Grid>

            </React.Fragment>
            )}
            {/*</DialogContentText>*/}
          </DialogContent>
          <DialogActions style={{margin: 8, textAlign: 'center'}}>
            <StyledButton onClick={this.handleApply} autoFocus>
              Apply
            </StyledButton>
          </DialogActions>
        </Dialog>
      </DrawerDialogPropainer>
    );
  }
}

// export default withMobileDialog()(DrawerDialog);
export default compose(connect(), withMobileDialog(), withStyles(styles))(DrawerDialog);
