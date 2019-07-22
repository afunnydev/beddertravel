import React from 'react';
import PropTypes from 'prop-types';

import styled from 'styled-components';

import { withStyles } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';

import Security from '@material-ui/icons/Security';
import ErrorOutline from '@material-ui/icons/ErrorOutline';

const StyledPaper = styled(Paper)`
  padding: 25px;
`;

const Title = styled(Typography)`
  margin-bottom: 20px !important;
  font-weight: 700 !important;
  font-style: italic;
`;

const Description = styled(Typography)`
  margin-bottom: 20px !important;
`;

const BadgePaperText = styled(Typography)`
  font-size: 22px !important;
  font-weight: 700 !important;
  font-style: italic;
`;

const GeneralInfoMore = (props) => (
  <Grid container justify="center">
    <Grid item xs={12} md={10} style={{ padding: 20 }}>
      <StyledPaper>
        <Title variant="body2">Description of the accommodation</Title>
        <Description variant="body1">{props.activities}</Description>

        <Title variant="body2">Highlights of the accommodation</Title>
        <Description variant="body1">{props.opinionStrong}</Description>

        <Title variant="body2">Weaknesses of the accommodation</Title>
        <Description variant="body1">{props.opinionWeak}</Description>

        <Title variant="body2">Directions to the accommodation</Title>
        <Description variant="body1">{props.howToFind}</Description>
      </StyledPaper>
    </Grid>

    <Grid item xs={12} md={10} style={{ padding: 20 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Grid container alignItems="center">
              <Grid item xs={11}>
                <BadgePaperText variant="subtitle1">This establishment is safe</BadgePaperText>
              </Grid>
              <Grid item xs={1}>
                <Security color="primary" />
              </Grid>
            </Grid>
          </StyledPaper>
        </Grid>

        <Grid item xs={12} md={6}>
          <StyledPaper>
            <Grid container alignItems="center">
              <Grid item xs={11} style={{ cursor: 'pointer' }} onClick={props.openReport}>
                <BadgePaperText variant="subtitle1">Report this establishment</BadgePaperText>
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
);

GeneralInfoMore.propTypes = {

};

export default GeneralInfoMore;