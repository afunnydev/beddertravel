import React from 'react';
import { Helmet } from 'react-helmet';
import styled from 'styled-components';
import ReactMarkdown from 'react-markdown';

import Grid from '@material-ui/core/Grid';
import Hidden from '@material-ui/core/Hidden';

import BackButton from 'components/BackButton';
import json from './data.json';

const AboutGrid = styled(Grid)`
  h3 {
    font-size: 42px;
    font-weight: 300;
    line-height: 50px;
    margin-top: 30px;
    margin-bottom: 30px;
    color: black;
  }
  p {
    margin-bottom: 30;
    color: black;
  }
`;

const AboutPage = () => (
  <>
    <Helmet>
      <title>About Bedder Travel</title>
    </Helmet>
    <Grid
      container
      spacing={0}
      direction="row"
      style={{ paddingTop: 20, paddingBottom: 40, marginTop: 30 }}
    >
      <Grid item sm={12} md={8} style={{ marginLeft: 'auto', padding: '0px 15px'}}>
        <Grid container direction="row">
          <Hidden mdUp>
            <Grid item xs={12}>
              <BackButton />
            </Grid>
          </Hidden>
          <AboutGrid item lg={12}>
            <ReactMarkdown source={json.text} />
          </AboutGrid>
        </Grid>
      </Grid>
      <Hidden smDown>
        <Grid item md={1} />
      </Hidden>
    </Grid>
  </>
);

export default AboutPage;
