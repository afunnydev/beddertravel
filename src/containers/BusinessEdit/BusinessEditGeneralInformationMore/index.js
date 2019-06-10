import React from 'react';
// import PropTypes from 'prop-types';

import { withConnect as withReduxConnect } from '../BusinessEditGeneralInformationRedux';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import Photos from '../BusinessEditBedrooms/Room/Photos';
import ProgressTitle from '../ProgressTitle';
import { addCoverPhotoAction, removeCoverPhotoAction } from '../BusinessEditGeneralInformationRedux/actions';

const BusinessEditGeneralInformationMore = (props) => {
  const addPhoto = (result) => {
    props.dispatch(addCoverPhotoAction(result));
  };

  const removePhoto = (i) => {
    props.dispatch(removeCoverPhotoAction(i));
  };

  return (
    <React.Fragment>
      <Grid container style={{ marginTop: 20 }} spacing={3}>
        <Grid item xs={12} md={3} style={props.isMobile ? {} : { paddingRight: 30 }}>
          <ProgressTitle text="Tell us more" progress={props.activities.length <= 100 ? props.activities.length : 100} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="activities"
            label="Describe this business"
            multiline
            fullWidth
            rows={4}
            value={props.activities}
            onChange={props.onChangeActivities}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: 30 }}
          />
          <TextField
            id="around"
            label="Describe the surroundings"
            multiline
            fullWidth
            rows={4}
            value={props.around}
            onChange={props.onChangeAround}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <InputLabel shrink error={props.validationErrors.coverPhoto} style={{ marginBottom: 10 }}>
            Cover Photo*
          </InputLabel>
          <Photos
            aspectWidth={16}
            aspectHeight={9}
            addPhoto={addPhoto}
            photos={props.coverPhoto}
            removePhoto={removePhoto}
            photosInArray
          />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={12} md={3} style={props.isMobile ? {} : { paddingRight: 30 }}>
          <ProgressTitle text="Your opinion" progress={props.opinionStrong.length <= 100 ? props.opinionStrong.length : 100} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="opinionStrong"
            label="Strongest points"
            multiline
            fullWidth
            rows={4}
            value={props.opinionStrong}
            onChange={props.onChangeOpinionStrong}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: 30 }}
          />
          <TextField
            id="opinionWeak"
            label="Weakest points"
            multiline
            fullWidth
            rows={4}
            value={props.opinionWeak}
            InputLabelProps={{
              shrink: true,
            }}
            onChange={props.onChangeOpinionWeak}
          />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={12} md={3} style={props.isMobile ? {} : { paddingRight: 30 }}>
          <ProgressTitle text="Directions" progress={props.howToFind.length <= 100 ? props.howToFind.length : 100} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            id="howToFind"
            label="How can people find this business?"
            multiline
            fullWidth
            rows={4}
            value={props.howToFind}
            onChange={props.onChangeHowToFind}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

BusinessEditGeneralInformationMore.propTypes = {};

export default withReduxConnect(BusinessEditGeneralInformationMore);
