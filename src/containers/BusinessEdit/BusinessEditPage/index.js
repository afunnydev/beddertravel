import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import withMobileDialog from '@material-ui/core/withMobileDialog';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import ErrorNetwork from 'components/ErrorNetwork';
import ErrorResult from 'components/ErrorResult';
import BedderLoadingIndicator from 'components/BedderLoadingIndicator';

import BedderValidator from 'bedder/bedderValidator';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';
import makeSelectBusinessEditPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import BusinessEditPageHeader from './BusinessEditPageHeader';

import BusinessEditGeneralInformation from '../BusinessEditGeneralInformation';
import BusinessEditGeneralInformationMore from '../BusinessEditGeneralInformationMore';
import BusinessEditBedrooms from '../BusinessEditBedrooms';
import { withConnect as withReduxConnect } from '../BusinessEditPageRedux';
import { withConnect as withGeneralReduxConnect } from '../BusinessEditGeneralInformationRedux';
import { withConnect as withBedroomsReduxConnect } from '../BusinessEditBedroomsRedux';
import BusinessEditPageRedux from '../BusinessEditPageRedux';

BedderValidator.prepareTextField();

export class BusinessEditPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      roomDoValidation: false,
      valid: true,
      isPageValid: true,
      validateRoom: false,
      validationErrors: {
        stars: false,
        coverPhoto: false,
        beds: false,
      },
      invalid: false,
      refresh: false,
    };
    this.vRefs = BedderValidator.makeRefs(BedderValidator.getBusinessEditPage());
    this.submitDraft = this.submitDraft.bind(this);
    this.submitPublic = this.submitPublic.bind(this);

    this.roomsRef = React.createRef();
  }

  submitDraft() {
    this.props.submitDraft();
  }

  submitPublic() {
    if (!this.validateRest()) {
      return false;
    }
    if (!BedderValidator.validate(this.vRefs)) {
      this.setState({ valid: false });
      this.setState({ isPageValid: false });
      return false;
    } else {
      this.setState({ isPageValid: true });
    }

    this.setState({ valid: true });
    this.props.submitPublic();
  }

  validateRest() {
    let invalid = false;
    const validationErrors = this.state.validationErrors;

    if(!this.validateRoom()) {
      invalid = true;
    }

    this.setState({roomDoValidation: !this.state.roomDoValidation});

    if (this.props.stars == 0) {
      validationErrors.stars = true;
      invalid = true;
    } else {
      validationErrors.stars = false;
    }

    if (this.props.location == '' || this.props.location.length <= 0) {
      validationErrors.location = true;
      invalid = true;
    } else {
      validationErrors.location = false;
    }

    if (
      this.props.coverPhoto && this.props.coverPhoto.length
    ) {
      validationErrors.coverPhoto = false;
    } else {
      validationErrors.coverPhoto = true;
      invalid = true;
    }

    this.setState({ validationErrors });
    this.setState({ invalid });

    this.setState({ refresh: !this.state.refresh });
    this.setState({ validateRoom: !this.state.validateRoom });

    return invalid == true ? false : true ;
  }

  validateRoom() {
    let validationErrors = this.state.validationErrors;
    let ret = true;

    if(this.props.roomPhotos &&
      this.props.roomPhotos.get('byId') &&
      this.props.roomPhotos.get('byId').size > 1
    ) {
      validationErrors['photos'] = false;
    } else {
      validationErrors['photos'] = true;
      ret = false;
    }

    if (this.props.roomBedsKing + this.props.roomBedsQueen + this.props.roomBedsSimple <= 0) {
      validationErrors['beds'] = true;
      ret = false;
    } else {
      validationErrors['beds'] = false;
    }

    if(this.props.roomName.length > 0) {
      validationErrors['name'] = false;
    } else {
      validationErrors['name'] = true;
      ret = false;
    }

    if(this.props.roomNumRooms > 0) {
      validationErrors['numRooms'] = false;
    } else {
      validationErrors['numRooms'] = true;
      ret = false;
    }

    if(this.props.roomNumPeople > 0) {
      validationErrors['numPeople'] = false;
    } else {
      validationErrors['numPeople'] = true;
      ret = false;
    }

    if(this.props.roomPrice > 0) {
      validationErrors['price'] = false;
    } else {
      validationErrors['price'] = true;
      ret = false;
    }

    // Discount can be null, removed for now!
    if(this.props.roomDiscount > -1) {
      validationErrors['discount'] = false;
    } else {
      validationErrors['discount'] = true;
      ret = false;
    }

    this.setState({validationErrors});
    this.setState({ refresh: !this.state.refresh });
    return ret;
  }

  render() {
    const inModel =
      this.props.modelResult &&
      this.props.modelResult.result;
    const businessStatus =
      this.props.modelResult &&
      this.props.modelResult.result &&
      this.props.modelResult.result.status;
    const validationErrors = this.state.validationErrors;
    const refresh = this.state.refresh;
    const isXS = this.props.width == 'xs';
    const isMobile = this.props.width == 'xs' || this.props.width == 'sm';
    return (
      <div>
        <Helmet>
          <title>Edit Accomodation</title>
        </Helmet>
        <BusinessEditPageRedux />

        <Grid container style={{ padding: '0px 15px' }}>
          <BusinessEditPageHeader />
          
          {this.props.submitting 
            ? <BedderLoadingIndicator full />
            : businessStatus >= 2
              ? <Grid container spacing={4}>
                <BusinessEditGeneralInformation
                  refresh={refresh}
                  width={this.props.width}
                  isMobile={isMobile}
                  isXS={isXS}
                  validationErrors={validationErrors}
                  vRefs={this.vRefs}
                  modelResult={this.props.modelResult}
                />

                <BusinessEditBedrooms
                  ref={instance => { this.roomsRef = instance; }}
                  validateRoom={this.state.validateRoom}
                  width={this.props.width}
                  isMobile={isMobile}
                  isXS={isXS}
                  refresh={refresh}
                  validationErrors={validationErrors}
                  vRefs={this.vRefs}
                  modelResult={this.props.modelResult}
                  roomDoValidation={this.state.roomDoValidation}
                />

                <BusinessEditGeneralInformationMore
                  refresh={refresh}
                  width={this.props.width}
                  isMobile={isMobile}
                  isXS={isXS}
                  validationErrors={validationErrors}
                  vRefs={this.vRefs}
                  modelResult={this.props.modelResult}
                />

                <Hidden smDown>
                  <Grid item xs={12} md={3}>
                    &nbsp;
                  </Grid>
                </Hidden>
                <Grid item xs={12} md={9}>
                  <div style={{ margin: 10 }}>
                    <ErrorResult result={this.props.modelResult} />
                    <ErrorNetwork error={this.props.modelError} />
                    <ErrorResult result={this.props.result} />
                    <ErrorNetwork error={this.props.error} />
                    {this.props.result && this.props.result.errors && (
                      <Typography color="error">An error occurred. Please, make sure you entered at least an address.</Typography>
                    )}
                  </div>
                  {(!this.state.valid || this.state.invalid) && (
                    <Typography color="error">Please, make sure all fields are filled before submitting the business for review.</Typography>
                  )}
                  <Button
                    disabled={this.props.submitting}
                    variant="contained"
                    color="primary"
                    onClick={this.submitDraft}
                    style={{
                      padding: '10px 50px',
                      fontSize: 16,
                      textTransform: 'none',
                      marginRight: 20,
                    }}
                  >
                    Save Changes
                  </Button>
                  {businessStatus && (
                    <Button
                      disabled={this.props.submitting || businessStatus === 3 }
                      variant="contained"
                      color="primary"
                      onClick={this.submitPublic}
                      style={{
                        padding: '10px 50px',
                        fontSize: 16,
                        textTransform: 'none',
                        background: 'linear-gradient(90deg, rgb(141, 64, 65) 0%, rgb(75, 65, 140) 100%)',
                      }}
                    >
                      {businessStatus < 3 ? 'Submit for Review' : 'In Review'}
                    </Button>
                  )}
                </Grid>
              </Grid>
              : <Grid container justify="center"><Grid item xs={12} sm={6}><Typography variant="subtitle1" align="center">This business isn't currently available. Please make sure that the owner of this business has successfully created an account before you  can start adding information. Contact us at info@beddertravel.com if you need any help.</Typography></Grid></Grid>}
        </Grid>
      </div>
    );
  }
}

BusinessEditPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

BusinessEditPage.defaultProps = {
  submitting: true,
};

const mapStateToProps = createStructuredSelector({
  businessaddpage: makeSelectBusinessEditPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
  null,
  {forwardRef: true, pure: true}
);

const withReducer = injectReducer({ key: 'businessEditPage', reducer });
const withSaga = injectSaga({ key: 'businessEditPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withReduxConnect,
  withGeneralReduxConnect,
  withBedroomsReduxConnect,
  withMobileDialog(),
)(BusinessEditPage);
