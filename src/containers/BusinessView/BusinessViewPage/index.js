/**
 *
 * BusinessViewPage
 *
 */

import React from 'react';
import { connect } from 'react-redux';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import { withRouter } from 'react-router-dom';

import BedderConfig from 'bedder/bedderConfig';
import Bedder from 'bedder/bedder';

import injectSaga from 'utils/injectSaga';
import SearchBar from 'containers/SearchBar/Loadable';
import SupportTicket from 'components/SupportTicket/Loadable';
import AskQuestion from 'components/AskQuestion/Loadable';

import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { Button } from '@material-ui/core';

import Place from '@material-ui/icons/PlaceOutlined';
import Security from '@material-ui/icons/Security';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

import WithUserContext from '../../AppContext/context';

import saga from './saga';
import BedderLoadingIndicator from '../../../components/BedderLoadingIndicator';
import BusinessViewRoom from './BusinessViewRoom';
import Amenities from '../../BusinessEdit/BusinessEditGeneralInformation/Amenities';
import BusinessViewReviews from './BusinessViewReviews';

const HeaderImage = styled.div`
  width: 100%;
  min-height: 350px;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
`;

const StyledPaper = styled(Paper)`
  padding: 10px;
`;

const StyledBlockPaperAuto = styled(StyledPaper)`
  height: auto;
  text-align: center;
  a {
    color: #8f3f3f !important;
    cursor: pointer;
  }
`;

const StyledBlockPaper = styled(StyledPaper)`
  height: 135px;
  text-align: center;
`;

const StyledBodyPaper = styled(StyledPaper)`
  padding: 25px;
`;

const styles = theme => ({
  paperBg: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '14pt',
    fontWeight: 'bold',
    padding: '5px 0px',
  },
  coverPhoto: {
    width: '100%',
    minHeight: 350,
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    marginBottom: 15,
  },
  loadingPage: {
    opacity: 0.5,
  },
});
/* eslint-disable react/prefer-stateless-function */
export class BusinessViewPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supportOpen: false,
      reportOpen: false,
    };
  }

  openSupport = () => {
    if (Bedder.notUser()) {
      Bedder.onlyForUser(this.props.history);
      return false;
    }
    return this.setState({ supportOpen: true });
  }

  closeSupport = () => this.setState({ supportOpen: false });

  openReport = () => {
    if (Bedder.notUser()) {
      Bedder.onlyForUser(this.props.history);
      return false;
    }
    return this.setState({ reportOpen: true });
  }

  closeReport = () => this.setState({ reportOpen: false });

  changeModelId = (id = null) => {
    // console.log('changeModelId ', this.props);

    if (
      this.props.match &&
      this.props.match.params &&
      this.props.match.params.id &&
      this.props.match.params.id.length > 0
    ) {
      // this.props.dispatch(changeModelIdAction(this.props.match.params.id));
      // let id = Object.assign({}, this.props.match.params.id);
      // let id = parseInt(this.props.match.params.id);
      // console.log('this.props.modelId about to changeModelIdThunk id=', id)
      // this.props.onChangeModelIdThunk(this.props.match.params.id);
      // this.props.onChangeModelId(this.props.match.params.id);
      // this.props.submitGet(this.props.match.params.id);
      this.props.onChangeModelId(this.props.match.params.id);
      this.props.submitGet();
    }

    if (id > 0) {
      // this.props.onChangeModelId(this.props.match.params.id);
      // this.props.submitModel(this.props.match.params.id);
    }
  }

  componentDidUpdate(prevProps) {
    // console.log('BusinessViewPage did update', prevProps);
    if (
      prevProps.getResultModel != this.props.getResultModel &&
      this.props.getResultModel.result &&
      this.props.getResultModel.result.id &&
      this.props.getResultModel.result.id > 0
    ) {
      this.props.processModel();
    }
    //
    // if(prevProps.bookResult != this.props.bookResult
    //   && this.props.bookResult.result
    //   && this.props.bookResult.result.id
    //   && this.props.bookResult.result.id > 0) {
    //   // this.props.processModel();
    // }
    //
    // if(prevProps.bookError != this.props.bookError
    //   && this.props.bookError.result
    //   && this.props.bookError.result.id
    //   && this.props.bookError.result.id > 0) {
    //   // this.props.processModel();
    // }
  }

  componentDidMount() {
    this.changeModelId();
    console.log(this.props);
  }

  render() {
    const { classes } = this.props;
    const amenities = this.props.bAmenities;
    const isMobile = this.props.width == 'xs' || this.props.width == 'sm';
    const messages = BedderConfig.getReviewMessages();
    let ohMyGod = -1;
    // console.log('BusinessViewPage props', this.props);
    return (
      <div>
        <Helmet>
          <title>Acommodation</title>
        </Helmet>
        <div
          className={this.props.getSubmitting ? classes.loadingPage : null}
        >
          <SearchBar />

          {this.props.getSubmitting && <BedderLoadingIndicator />}

          <HeaderImage img={this.props.bPhotoActive} />

          <Hidden mdUp>
            <Grid
              container
              style={{ position: 'relative', height: 65, top: -85 }}
            >
              <Grid item xs={9} />
              <Grid item xs={3} style={{ padding: 5 }}>
                <div style={{ maxWidth: 100, height: '100%' }}>
                  <Button
                    onClick={this.openSupport}
                    style={{ width: '100%', marginBottom: 0, height: '100%' }}
                    color="primary"
                    variant="contained"
                  >
                    <span className="icon-chat" />
                  </Button>
                </div>
              </Grid>
            </Grid>
          </Hidden>

          <AskQuestion
            closeFn={this.closeSupport}
            isOpen={this.state.supportOpen}
            businessId={this.props.modelId}
          />

          <SupportTicket
            isQuestion={false}
            closeFn={this.closeReport}
            isOpen={this.state.reportOpen}
            businessId={this.props.modelId}
          />

          <Grid
            container
            justify="center"
            alignContent="center"
            style={isMobile ? { marginTop: -85 } : {}}
          >
            <Grid item xs={12} md={10} lg={8} style={{ padding: 20 }}>
              <Grid
                container
                justify="center"
                alignContent="center"
                spacing={4}
              >
                <Grid item xs={8} md={8}>
                  <StyledBlockPaperAuto>
                    {/* {[...Array(this.props.bStars)].map((v, i) => ( */}
                    {/*   <StarRate key={i} color="primary" /> */}
                    {/* ))} */}
                    <Typography
                      style={{ margin: '10px 0px 10px' }}
                      variant="h5"
                    >
                      {this.props.bName}
                    </Typography>
                    <Divider />
                    <Typography
                      noWrap
                      style={{ margin: '19px 0px', fontStyle: 'italic' }}
                      color="primary"
                    >
                      <Place />
                      <a target="_blank" rel="noopener noreferrer" href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(this.props.bLocation)}`}>
                        {this.props.bLocation}
                      </a>
                    </Typography>
                  </StyledBlockPaperAuto>
                </Grid>
                <Hidden smDown>
                  <Grid item xs={2} md={2}>
                    <StyledBlockPaper>
                      <Grid container style={{ height: '100%' }}>
                        <Grid item xs={12}>
                          <Typography
                            align="center"
                            style={{ marginBottom: 10, fontSize: '0.8em' }}
                          >
                            Need help with this location?
                          </Typography>
                        </Grid>
                        <Grid item xs={12}>
                          <Button
                            onClick={this.openSupport}
                            style={{
                              width: '100%',
                              marginBottom: 0,
                              height: '100%',
                            }}
                            color="primary"
                            variant="contained"
                          >
                            {/* <Chat/> */}
                            <span className="icon-chat" />
                          </Button>
                        </Grid>
                      </Grid>
                    </StyledBlockPaper>
                  </Grid>
                </Hidden>
                <Grid item xs={4} md={2}>
                  <StyledBlockPaper>
                    <Grid container style={{ height: '100%' }}>
                      <Grid item xs={12}>
                        <Paper className={classes.paperBg}>
                          {this.props.bReviewScore > 0
                            ? this.props.bReviewScore
                            : '-'}
                        </Paper>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography
                          style={{ marginTop: 10, fontSize: '0.8em' }}
                        >
                          Based on {this.props.bReviewsCount} reviews
                        </Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Typography color="primary" variant="subtitle1">
                          {this.props.bReviewScore > 0
                            ? messages[Math.round(this.props.bReviewScore)]
                            : 'New'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </StyledBlockPaper>
                </Grid>

                <Grid item xs={12} style={{ margin: '0px 0px' }}>
                  <BusinessViewReviews businessId={parseInt(this.props.modelId)} />
                </Grid>

                <Grid item xs={12} style={{ margin: '0px 0px' }}>
                  <Typography variant="body2">On-site amenities</Typography>

                  <Amenities
                    noClick
                    amenities={amenities}
                  />
                </Grid>

                <Grid item xs={12}>
                  {this.props.bRooms &&
                    this.props.bRooms.map((v, i) => {
                      console.log('room', v, i);
                      // this.props.getResultModel.quotes[i+1]
                      if (
                        v.parentId ||
                        !this.props.getResultModel.quotes[v.id]
                      ) {
                        return false;
                      }

                      if (ohMyGod == -1) {
                        ohMyGod = 1;
                      } else {
                        ohMyGod++;
                      }

                      return (
                        <BusinessViewRoom
                          key={v.id}
                          bm={this.props.getResultModel.bm}
                          width={this.props.width}
                          lh={this.props.history}
                          user={this.props.user}
                          makeBooking={this.props.makeBooking}
                          clearBooking={this.props.clearBooking}
                          room={v}
                          getResultModel={this.props.getResultModel}
                          // onSubmit={val => console.log('val', val)}
                          bookResult={this.props.bookResult}
                          bookSubmitting={this.props.bookSubmitting}
                          bookError={this.props.bookError}
                          searchFrom={this.props.searchFrom}
                          searchTo={this.props.searchTo}
                          searchNumPeople={this.props.searchNumPeople}
                        />
                      );
                    })}
                  {ohMyGod <= 0 && (
                    <Typography align="center" variant="headline">
                      Business is not available for selected dates
                    </Typography>
                  )}
                </Grid>

                <Grid item xs={12}>
                  <StyledBodyPaper>
                    <Typography
                      variant="body2"
                      style={{
                        marginBottom: '15px',
                        fontWeight: 700,
                        fontStyle: 'italic',
                      }}
                    >
                      Highlights of the accommodation
                    </Typography>
                    <Typography variant="body1">
                      {this.props.bOpinionStrong}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        margin: '15px 0px',
                        fontWeight: 700,
                        fontStyle: 'italic',
                      }}
                    >
                      Weaknesses of accommodation
                    </Typography>
                    <Typography variant="body1">
                      {this.props.bOpinionWeak}
                    </Typography>
                    <Typography
                      variant="body2"
                      style={{
                        margin: '15px 0px',
                        fontWeight: 700,
                        fontStyle: 'italic',
                      }}
                    >
                      Activities in the vicinity
                    </Typography>
                    <Typography variant="body1">
                      {this.props.bActivities}
                    </Typography>
                  </StyledBodyPaper>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{ marginTop: 15, paddingRight: 15 }}
                >
                  <StyledPaper>
                    <Grid container>
                      <Grid item xs={11}>
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontStyle: 'italic',
                            fontSize: '14pt',
                            lineHeight: 1.5,
                          }}
                        >
                          This establishment is safe
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <Security color="primary" />
                      </Grid>
                    </Grid>
                  </StyledPaper>
                </Grid>

                <Grid
                  item
                  xs={12}
                  sm={6}
                  style={{ marginTop: 15, paddingLeft: 15 }}
                >
                  <StyledPaper>
                    <Grid container>
                      <Grid
                        item
                        xs={11}
                        style={{ cursor: 'pointer' }}
                        onClick={this.openReport}
                      >
                        <Typography
                          variant="subtitle1"
                          style={{
                            fontStyle: 'italic',
                            fontSize: '14pt',
                            lineHeight: 1.5,
                          }}
                        >
                          Report this establishment
                        </Typography>
                      </Grid>
                      <Grid item xs={1}>
                        <ErrorOutline color="primary" />
                      </Grid>
                    </Grid>
                  </StyledPaper>
                </Grid>
              </Grid>
            </Grid>
          </Grid>
        </div>
      </div>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
  };
}

const withConnect = connect(
  null,
  mapDispatchToProps,
);
const withSaga = injectSaga({ key: 'businessViewPage', saga });

export default compose(
  withSaga,
  withConnect,
  WithUserContext,
  withRouter,
  withStyles(styles),
  withMobileDialog(),
)(BusinessViewPage);

export { withConnect };
