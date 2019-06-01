/**
 *
 * BookingPage
 *
 */

import React from 'react';
import moment from 'moment';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import { compose } from 'redux';

import BedderConfig from 'bedder/bedderConfig';

import injectSaga from 'utils/injectSaga';
import BackButton from 'components/BackButton';
import SearchBar from 'containers/SearchBar/Loadable';
import SupportTicket from 'components/SupportTicket/Loadable';
import AskQuestion from 'components/AskQuestion/Loadable';

import styled from 'styled-components';

import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Divider from '@material-ui/core/Divider';
import withMobileDialog from '@material-ui/core/withMobileDialog';
import { withStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import StarRate from '@material-ui/icons/Star';
import Place from '@material-ui/icons/PlaceOutlined';
import Security from '@material-ui/icons/Security';
import ErrorOutline from '@material-ui/icons/ErrorOutline';
import ShareOutlined from '@material-ui/icons/ShareOutlined';
import { Button } from '@material-ui/core';

import { EmailShareButton } from 'react-share';

import saga from './saga';

const HeaderImage = styled.div`
  width: 100%;
  min-height: 350px;
  background-image: url(${props => props.img});
  background-size: cover;
  background-position: center;
  margin-bottom: 15px;
  border-radius: 4px;
`;

const StyledPaper = styled(Paper)`
  padding: 10px;
`;

const StyledBlockPaper = styled(StyledPaper)`
  height: 135px;
  text-align: center;
`;

const styles = theme => ({
  paperBg: {
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    fontSize: '14pt',
    fontWeight: 'bold',
    padding: '5px 0px',
  },
});
/* eslint-disable react/prefer-stateless-function */
export class BookingPage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      supportOpen: false,
      reportOpen: false,
    };

    this.openSupport = this.openSupport.bind(this);
    this.closeSupport = this.closeSupport.bind(this);
    this.openReport = this.openReport.bind(this);
    this.closeReport = this.closeReport.bind(this);
  }

  openSupport() {
    this.setState({ supportOpen: true });
  }

  closeSupport() {
    this.setState({ supportOpen: false });
  }

  openReport() {
    this.setState({ reportOpen: true });
  }

  closeReport() {
    this.setState({ reportOpen: false });
  }

  changeModelId(id = null) {

    if (
      this.props.match
      && this.props.match.params
      && this.props.match.params.id
      && this.props.match.params.id.length > 0
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
    // console.log('BookingPage did update', prevProps);
    if (prevProps.getResultModel != this.props.getResultModel
      && this.props.getResultModel.result
      && this.props.getResultModel.result.id
      && this.props.getResultModel.result.id > 0) {
      this.props.processModel();
    } else {
      // console.log('TABARNACK');
      // console.log(this.props.getResultModel);
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
  }

  render() {
    const { classes } = this.props;
    const isMobile = this.props.width == 'xs' || this.props.width == 'sm';
    const messages = BedderConfig.getReviewMessages();
    const amount = this.props.getResultModel && this.props.getResultModel.result ? parseFloat(this.props.getResultModel.result.amount).toFixed(2) : 0.00;
    const deposit = (amount * 0.15).toFixed(2);
    return (
      <div>
        <Helmet>
          <title>Booking</title>
        </Helmet>
        <SearchBar />

        <Hidden mdUp>
          <Grid container style={{ position: 'relative', height: 65, top: -85 }}>
            <Grid item xs={9}></Grid>
            <Grid item xs={3} style={{ padding: 5 }}>
              <div style={{ maxWidth: 100, height: '100%' }}>
                <Button onClick={this.openSupport} style={{ width: '100%', marginBottom: 0, height: '100%' }} color="primary" variant="contained">
                  {/* <Chat/> */}
                  <span className="icon-chat"></span>
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

        <Grid container justify="center" alignContent="center" style={isMobile ? { marginTop: -85 } : {}}>
          <Grid item xs={12} md={10} lg={8} style={{ padding: 20 }}>
            <Grid container justify="center" alignContent="center" spacing={24}>
              <Hidden mdUp>
                <Grid item xs={12}>
                </Grid>
              </Hidden>

              <Grid item xs={12}>
                <BackButton style={{ position: 'absolute', zIndex: 100 }} />
                <Typography align="center" style={{ position: 'relative' }} variant="display1">Reservation</Typography>
              </Grid>

              <Grid item xs={12}>
                <Paper>
                  <HeaderImage img={this.props.bPhotoActive} />
                </Paper>
              </Grid>

              <Grid item sm={8} xs={8} align="center">
                <StyledBlockPaper>
                  {/* {[...Array(this.props.bStars)].map((v, i) => ( */}
                  {/*   <StarRate key={i} color="primary" /> */}
                  {/* ))} */}
                  <Typography style={{ margin: '5px 0px' }} noWrap variant="headline">{this.props.bName}</Typography>
                  <Divider />
                  <Typography noWrap style={{ margin: '10px 0px', fontStyle: 'italic' }} color="primary">
                    <Place />
                    {' '}
                    {this.props.bLocation}
                  </Typography>
                </StyledBlockPaper>
              </Grid>
              <Hidden smDown>
                <Grid item xs={2}>
                  <StyledBlockPaper>
                    <Grid container style={{ height: '100%' }}>
                      <Grid item xs={12}>
                        <Typography align="center" style={{ marginBottom: 10, fontSize: '0.8em' }}>You can ask any question to the hotel owner</Typography>
                      </Grid>
                      <Grid item xs={12}>
                        <Button onClick={this.openSupport} style={{ width: '100%', marginBottom: 0, height: '100%' }} color="primary" variant="contained">
                          {/* <Chat/> */}
                          <span className="icon-chat"></span>
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
                      <Paper className={classes.paperBg}>{this.props.bReviewScore > 0 ? this.props.bReviewScore : '-'}</Paper>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography style={{ marginTop: 10, fontSize: '0.8em' }}>
                        Based on {this.props.bReviewsCount} review{this.props.bReviewsCount > 1 ? 's' : ''}
                      </Typography>
                    </Grid>
                    <Grid item xs={12}>
                      <Typography color="primary" variant="title">{this.props.bReviewScore > 0 ? messages[Math.round(this.props.bReviewScore)] : 'New'}</Typography>
                    </Grid>
                  </Grid>
                </StyledBlockPaper>
              </Grid>

              <Grid item xs={12} sm={8}>

                {this.props.getResultModel && this.props.getResultModel.result &&
                <React.Fragment>
                  {moment(this.props.getResultModel.result.to).diff(Date.now()) < 0 && <Grid item xs={12}>
                    <Button
                      component={Link}
                      to={`/review/add/${this.props.modelId}`}
                      variant="contained"
                      fullWidth
                      color="primary"
                      style={{
                        fontSize: '12pt', lineHeight: 1.5, marginBottom: 15, height: 43,
                      }}
                    >
                      Leave a review
                    </Button>
                  </Grid>}

                  <StyledPaper style={{ marginBottom: 25 }}>
                    <Typography variant="title" style={{ marginBottom: 7, marginTop: 7 }}>Directions</Typography>
                    <Typography variant="body1" style={{ marginTop: 0 }}>
                      {this.props.getResultModel.result.business.howToFind}
                    </Typography>
                  </StyledPaper>

                  <StyledPaper>

                    <Typography variant="title" style={{ marginBottom: 7 }}>Dates</Typography>
                    <Typography variant="body2">
                      {moment(this.props.getResultModel.result.from).format('MMMM Do YYYY')} to {moment(this.props.getResultModel.result.to).format('MMMM Do YYYY')}
                    </Typography>
                    {this.props.getResultModel.result.payload && 
                      <React.Fragment>
                        <Typography variant="title" style={{ marginBottom: 7, marginTop: 7 }}>Informations</Typography>
                        <Typography variant="body2">
                          This reservation is for {this.props.getResultModel.result.payload.numPeople} person{this.props.getResultModel.result.payload.numPeople > 1 ? 's' : ''}.
                        </Typography>
                        <Typography variant="body2">
                          You booked {this.props.getResultModel.result.payload.numRooms} room{this.props.getResultModel.result.payload.numRooms > 1 ? 's' : ''}.
                        </Typography>
                      </React.Fragment>}
                    <Typography variant="title" style={{ marginBottom: 7, marginTop: 7 }}>Costs Details</Typography>
                    <Typography variant="body1" style={{ marginTop: 0 }}>
                      Total cost: {amount} USD<br />
                      Deposit: {deposit} USD<br />
                      Payable at {this.props.bName}: {(amount - deposit).toFixed(2)} USD
                    </Typography>
                  </StyledPaper>
                </React.Fragment>}
              </Grid>

              <Grid item xs={12} sm={4}>
                <StyledPaper style={{ height: 43 }}>
                  <Grid container>
                    <Grid item xs={11}>
                      <Typography variant="title" style={{ fontStyle: 'italic', fontSize: '12pt', lineHeight: 1.5 }}>This establishment is safe</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <Security color="primary" />
                    </Grid>
                  </Grid>
                </StyledPaper>

                <StyledPaper style={{ marginTop: 15, height: 43 }}>
                  <Grid container>
                    <Grid item xs={11}>
                      <Typography variant="title" style={{ fontStyle: 'italic', fontSize: '12pt', lineHeight: 1.5 }}>Report this establishment</Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <ErrorOutline color="primary" />
                    </Grid>
                  </Grid>
                </StyledPaper>

                <StyledPaper style={{ marginTop: 15, height: 43 }}>
                  <Grid container>
                    <Grid item xs={11}>
                      <Typography variant="title" style={{ fontStyle: 'italic', fontSize: '12pt', lineHeight: 1.5 }}>
                        Share your reservation
                      </Typography>
                    </Grid>
                    <Grid item xs={1}>
                      <EmailShareButton
                        subject={`My reservation at ${this.props.bName} on Bedder Travel.`}
                        body={
                          `Accomodation: ${this.props.bName}, ${this.props.bLocation}
                          Dates: ${this.props.getResultModel && this.props.getResultModel.result && moment(this.props.getResultModel.result.from).format('MMMM Do YYYY')} to ${this.props.getResultModel && this.props.getResultModel.result && moment(this.props.getResultModel.result.to).format('MMMM Do YYYY')}
                          Pay at accomodation: ${(amount - deposit).toFixed(2)} USD`
                        }
                      >
                        <ShareOutlined color="primary" />
                      </EmailShareButton>
                    </Grid>
                  </Grid>
                </StyledPaper>
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </div>
    );
  }
}

BookingPage.propTypes = {
  dispatch: PropTypes.func.isRequired,
};

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
  withStyles(styles),
  withMobileDialog(),
)(BookingPage);

export { withConnect };
