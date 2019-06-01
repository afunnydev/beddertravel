/**
 *
 * ComponentStateless
 *
 */

import React from 'react';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';

import Card from '@material-ui/core/Card';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';

import StarIcon from '@material-ui/icons/Star';
import LocationOnIcon from '@material-ui/icons/LocationOn';


const styles = () => ({
  card: {
    // minWidth: 380,
    // maxWidth: 380,
    // margin: 'auto',
    marginBottom: 15,
    backgroundColor: 'white',
    display: 'block',
  },
  media: {
    height: 0,
    borderRadius: 4,
    paddingTop: '56.25%', // 16:9
  },
  starContainer: {
    // fontSize: 12,
  },
  starIcon: {
    fontSize: 14,
  },
  cardContent: {
    padding: '10px 15px',
    '&:last-child': {
      paddingBottom: '10px',
    },
  },
  locationText: {
    fontSize: 12,
    marginTop: 7,
    // marginBottom: 15,
  },
  iconLocation: {
    fontSize: 18,
    marginTop: -1.5,
    marginLeft: -4,
  },
  ratingButton: {
    minWidth: 'auto',
    marginTop: 7,
    fontSize: 18,
    padding: '5px 10px',
  },
  reviewsText: {
    fontSize: 10,
    marginTop: 5,
  },
  discountText: {
    color: 'silver',
    fontSize: 12,
    // marginRight: 10,
  },
  priceText: {
    fontWeight: 'bold',
  },
  displayFlexAlignEnd: {
    display: 'flex',
    alignItems: 'flex-end',
  },
});

const BusinessItem = (props) => {
  const { classes, value } = props;
  const { rate } = value.businessUnit;
  // const rateDiscounted = rate - (rate / 100) * discount;
  // const discountText = Math.round((rate / 100) * discount);
  return (
    <React.Fragment>
      <Card
        component={Link}
        to={`/business/view/${value.business.id}`}
        className={classes.card}
        style={{ margin: 5 }}
      >
        {/* <CardActionArea> */}
        <CardMedia
          className={classes.media}
          image={
            value.business.coverPhoto
              ? (value.business.coverPhoto.photos &&
                  value.business.coverPhoto.photos.photos.byId[1].data) ||
                null
              : null
          }
          title={value.business.name}
        />
        <CardContent className={classes.cardContent}>
          <Grid container>
            <Grid item xs={9}>
              {/* <div className={classes.starContainer}> */}
              {/*   {[...Array(value.business.stars)].map((v, i) => ( */}
              {/*     <StarIcon */}
              {/*       key={i} */}
              {/*       className={classes.starIcon} */}
              {/*       color="primary" */}
              {/*     /> */}
              {/*   ))} */}
              {/* </div> */}
              <Typography variant="subheading">
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

            <Grid item xs={6} md={6} className={classes.displayFlexAlignEnd}>
              {/* <Typography variant="subheading" color="primary">Only ? left</Typography> */}
            </Grid>
            <Grid item xs={6} md={6}>
              <div align="right">
                {/* <div align="right"> */}
                {/*   <Typography className={classes.discountText}>-{discountText} USD</Typography> */}
                {/* </div> */}
                <Typography
                  align="right"
                  color="primary"
                  variant="body2"
                  className={classes.priceText}
                >
                  {Math.round(rate)} USD
                  <span style={{ color: '#000', fontWeight: 'normal', marginLeft: 5 }}>
                    per night{' '}
                  </span>
                </Typography>
              </div>
            </Grid>
          </Grid>
        </CardContent>
        {/* <CardActions> */}
        {/* <Button size="small" color="primary"> */}
        {/* Share */}
        {/* </Button> */}
        {/* </CardActions> */}
        {/* </CardActionArea> */}
      </Card>
    </React.Fragment>
  );
};

BusinessItem.propTypes = {};

export default withStyles(styles)(BusinessItem);
