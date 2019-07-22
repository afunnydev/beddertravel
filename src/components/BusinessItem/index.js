import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import LocationOnIcon from '@material-ui/icons/LocationOn';

import businessItemStyles from './businessItemStyles';
import DefaultImage from 'assets/images/bedder-default-bg.png';

const BusinessItem = (props) => {
  const { classes, value } = props;
  const { rate } = value.businessUnit;
  return (
    <React.Fragment>
      <Card
        component={Link}
        to={`/business/view/${value.business.id}`}
        className={classes.card}
        style={{ margin: 5 }}
      >
        <CardMedia
          className={classes.media}
          image={
            value.business.coverPhotos && value.business.coverPhotos.length
              ? value.business.coverPhotos[0].url
              : DefaultImage
          }
          title={value.business.name}
        />
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item xs={9}>
              <Typography variant="h4" className={classes.businessName}>
                {value.business.name}
              </Typography>
              <Typography
                variant="body1"
                noWrap
                className={classes.locationText}
              >
                <LocationOnIcon className={classes.iconLocation} />
                {value.business.address.address}
              </Typography>
            </Grid>
            <Grid item xs={3}>
              <div align="right">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.ratingButton}
                >
                  {value.business.reviewsAvg > 0
                    ? value.business.reviewsAvg
                    : '-'}
                </Button>
                <Typography className={classes.reviewsText}>
                  {value.business.reviewsNum} reviews
                </Typography>
              </div>
            </Grid>
            <Grid item xs={12}>
              <Typography
                align="right"
                color="primary"
                variant="body2"
                className={classes.priceText}
              >
                {Math.round(rate)} USD <span>per night</span>
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </React.Fragment>
  );
};

BusinessItem.propTypes = {};

export default withStyles(businessItemStyles)(BusinessItem);
