/**
 *
 * FaqPage
 *
 */

import React from 'react';
import { Helmet } from 'react-helmet';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';
import Typography from '@material-ui/core/Typography';

import BackButton from 'components/BackButton';
import Accordion from 'components/Accordion';

import json from './data.json';

const style = {
  aboutContainer: {
    color: 'black',
    paddingTop: 20,
    paddingBottom: 40,
    marginTop: 30,
  },
  aboutContent: {
    marginLeft: 'auto',
    padding: '0px 15px',
  },
  textBox: {
    marginBottom: 30,
  },
};

const FaqPage = () => (
  <div>
    <Helmet>
      <title>FAQ</title>
    </Helmet>
    <Grid container spacing={0} direction="row" style={style.aboutContainer} >
      <Grid item sm={12} md={8} style={style.aboutContent}>
        <Grid container direction="row">
          <Hidden mdUp>
            <Grid item xs={12}>
              <BackButton />
            </Grid>
          </Hidden>
          <Grid item lg={12}>
            <Typography
              align="left"
              style={{ paddingTop: 30, paddingBottom: 30 }}
              variant="headline"
            >
              Frequently Asked Question
            </Typography>
            <Accordion questions={json.questions} />
            <p style={{ marginTop: 30 }}>Your question is still unanswered? Contact us at <a href="mailto:info@beddertravel.com">info@beddertravel.com</a> for more information.</p>
          </Grid>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item md={1} />
      </Hidden>
    </Grid>
  </div>
);

export default FaqPage;
