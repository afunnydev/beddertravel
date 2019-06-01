/**
 *
 * BusinessItem
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
// import PropTypes from 'prop-types';
// import styled from 'styled-components';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Paper from '@material-ui/core/Paper';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  EmailShareButton,
  EmailIcon,
} from 'react-share';

const styles = theme => ({
  card: {
    display: 'flex',
    margin: '15px 0px',
  },
  details: {
    display: 'flex',
    justifyContent: 'flex-end',
    // flexDirection: 'column',
  },
  baseOn: {
    width: 90,
    fontSize: 12,
    // marginRight: 10,
    padding: '4px 10px',
    textAlign: 'right',
  },
  score: {
    // width: 45,
  },
  scoreBox: {
    // height: 35,
    padding: '7px 10px',
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main,
    fontSize: 18,
    fontWeight: 700,
  },
  content: {
    flex: '1',
    textAlign: 'right',
    padding: '7px 15px',
  },
  cover: {
    width: 210,
    height: 210,
  },
  title: {
    margin: '8px 0px',
  },
  gains: {
    fontWeight: 700,
    marginTop: 15,
  },
  commission: {
    textDecoration: 'underline',
    fontStyle: 'italic',
    fontSize: 12,
  },
  shareDiv: {
    display: 'inline-block',
    marginLeft: 4,
  },
  reservations: {
    marginBottom: 10,
  },
});

/* eslint-disable react/prefer-stateless-function */
class BusinessItem extends React.PureComponent {
  render() {
    const { classes, business } = this.props;
    // console.log('this.props.rooms', this.props.rooms.get('allIds').toJS());
    return (
      <React.Fragment>
        <Card className={classes.card}>
          <CardMedia
            component={Link}
            to={`/business/${business.id}`}
            className={classes.cover}
            image={
              business.coverPhoto
                ? (business.coverPhoto.photos &&
                    business.coverPhoto.photos.photos.byId[1].data) ||
                  null
                : null
            }
            title="Title"
          />
          <CardContent className={classes.content}>
            <div className={classes.details} align="right">
              <div className={classes.baseOn}>
                Base on <br /> {business.reviewsNum} reviews
              </div>
              <div className={classes.score}>
                <Paper classes={{ root: classes.scoreBox }}>
                  {business.reviewsAvg > 0 ? business.reviewsAvg : '-'}
                </Paper>
              </div>
            </div>

            <Typography variant="subheading" className={classes.title}>
              {business.name}
            </Typography>
            <Typography variant="body1" className={classes.reservations}>
              {business.bookingsCount} reservations
            </Typography>
            <FacebookShareButton
              url={`https://app.beddertravel.com/business/${business.id}`}
              className={classes.shareDiv}
              quote={`Discover ${business.name} on Bedder Travel.`}
            >
              <FacebookIcon size={32} round />
            </FacebookShareButton>
            <TwitterShareButton
              url={`https://app.beddertravel.com/business/${business.id}`}
              className={classes.shareDiv}
              title={`Discover ${business.name} on Bedder Travel.`}
              via="beddertravel"
            >
              <TwitterIcon size={32} round />
            </TwitterShareButton>
            <WhatsappShareButton
              url={`https://app.beddertravel.com/business/${business.id}`}
              className={classes.shareDiv}
              quote={`Discover ${business.name} on Bedder Travel.`}
            >
              <WhatsappIcon size={32} round />
            </WhatsappShareButton>
            <EmailShareButton
              url={`https://app.beddertravel.com/business/${business.id}`}
              className={classes.shareDiv}
              subject={`Discover ${business.name} on Bedder Travel.`}
            >
              <EmailIcon size={32} round />
            </EmailShareButton>
            {/* <Typography variant="body1">? visits</Typography> */}

            {/* <Typography variant="body1" color="secondary" className={classes.gains}>Gains + $32.3</Typography> */}
            {/* <Typography variant="body1" className={classes.commission}>Commission of 20%</Typography> */}
          </CardContent>
        </Card>
      </React.Fragment>
    );
  }
}

BusinessItem.propTypes = {};

export default withStyles(styles)(BusinessItem);
