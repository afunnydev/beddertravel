/**
 *
 * MyAdsPage
 *
 */

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { Link } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';

import injectSaga from 'utils/injectSaga';
import injectReducer from 'utils/injectReducer';

import Portal from '@material-ui/core/Portal';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';

import Add from '@material-ui/icons/Add';

import BedderLoadingIndicator from 'components/BedderLoadingIndicator';

import makeSelectMyAdsPage from './selectors';
import reducer from './reducer';
import saga from './saga';
import MyAdsPageRedux, { withConnect as withReduxConnect } from './MyAdsPageRedux';
import BusinessItem from './BusinessItem';

export class MyAdsPage extends React.Component {
  draftContainer = null;
  publishedContainer = null;

  componentDidMount() {
    this.props.submit();
  }

  render() {
    const { result } = this.props;
    let cntDraft = 0;
    let cntPublic = 0;
    // console.log('MyAdsPage props', this.props)
    return (
      <div>
        <Helmet>
          <title>My Accomodations</title>
        </Helmet>
        <MyAdsPageRedux />
        <Typography align="center" style={{ padding: 40, fontWeight: 300, fontStyle: 42 }} variant="h4">
          My Ads
        </Typography>

        {this.props.submitting && (
          <BedderLoadingIndicator/>
        )}

        <Grid container alignItems="center" justify="center" style={{padding: '0px 15px'}}>
          <Grid item xs={12} sm={8} md={6} lg={4} align="right">
            <Button variant="contained" color="primary" aria-label="Add" component={Link} to="/business/add">
              <Add/>
            </Button>
          </Grid>
        </Grid>

        <Grid container alignItems="center" justify="center" style={{padding: '0px 15px'}}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            {result && result.result && result.result.length > 0
              ? result.result.map((v, i) => {
                  if (v.status == 1) {
                    cntDraft++;
                    return (
                    <Portal key={v.id} container={this.draftContainer}>
                        <BusinessItem key={v.id} business={v} />
                      </Portal>
                    );
                  } else if (v.status == 100) {
                    cntPublic++;
                  return (
                      <Portal key={v.id} container={this.publishedContainer}>
                        <BusinessItem key={v.id} business={v} />
                    </Portal>
                    );
                }
                })
              : false}


            <React.Fragment>
              {this.props.submitting || (<Typography>{cntDraft} draft</Typography>)}
              <div
                ref={ref => {
                  this.draftContainer = ref;
                }}
              />

              {this.props.submitting || (<Typography>{cntPublic} online</Typography>)}
              <div
                ref={ref => {
                  this.publishedContainer = ref;
                }}
              />
            </React.Fragment>


          </Grid>
        </Grid>
      </div>
    );
  }
}

MyAdsPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  myadspage: makeSelectMyAdsPage(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps,
);

const withReducer = injectReducer({ key: 'myAdsPage', reducer });
const withSaga = injectSaga({ key: 'myAdsPage', saga });

export default compose(
  withReducer,
  withSaga,
  withConnect,
  withReduxConnect,
)(MyAdsPage);
