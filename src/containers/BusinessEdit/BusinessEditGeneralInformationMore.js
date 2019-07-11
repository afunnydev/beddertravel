import React from 'react';
import PropTypes from 'prop-types';

import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import InputLabel from '@material-ui/core/InputLabel';

import Photos from 'components/Photos';
import ProgressTitle from './ProgressTitle';

const BusinessEditGeneralInformationMore = (props) => {
  const onChange = (event) => props.client.writeData(
    { id: `Business:${props.id}`, data: { [event.target.name]: event.target.value } }
  );

  const calculateProgress = (field) => {
    if (field) return field.length  <= 100 ? field.length : 100;
    return 0;
  };

  return(
    <React.Fragment>
      <Grid container style={{ marginTop: 20 }} spacing={3}>
        <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
          <ProgressTitle text="Tell us more" progress={calculateProgress(props.activities)} />
        </Grid>
   
        <Grid item xs={12} md={6}>
          <TextField
            name="activities"
            label="Describe this business"
            multiline
            fullWidth
            rows={4}
            defaultValue={props.activities}
            onBlur={onChange}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: 30 }}
          />
          <TextField
            name="around"
            label="Describe the surroundings"
            multiline
            fullWidth
            rows={4}
            defaultValue={props.around}
            onBlur={onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
        <Grid item xs={12} md={3}>
          <InputLabel shrink error={props.validationErrors} style={{ marginBottom: 10 }}>
            Cover Photo*
          </InputLabel>
          <Photos
            id={props.id}
            photos={props.coverPhotos}
            client={props.client}
            addMutation="addFileToBusiness"
            removeMutation="removeFileFromBusiness"
          />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
          <ProgressTitle text="Your opinion" progress={calculateProgress(props.opinionStrong)} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="opinionStrong"
            label="Strongest points"
            multiline
            fullWidth
            rows={4}
            defaultValue={props.opinionStrong}
            onBlur={onChange}
            InputLabelProps={{
              shrink: true,
            }}
            style={{ marginBottom: 30 }}
          />
          <TextField
            name="opinionWeak"
            label="Weakest points"
            multiline
            fullWidth
            rows={4}
            defaultValue={props.opinionWeak}
            onBlur={onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>

      <Grid container style={{ marginTop: 30 }}>
        <Grid item xs={12} md={3} style={{ paddingRight: 30 }}>
          <ProgressTitle text="Directions" progress={calculateProgress(props.howToFind)} />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            name="howToFind"
            label="How can people find this business?"
            multiline
            fullWidth
            rows={4}
            defaultValue={props.howToFind}
            onBlur={onChange}
            InputLabelProps={{
              shrink: true,
            }}
          />
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

BusinessEditGeneralInformationMore.propTypes = {
  id: PropTypes.number.isRequired,
  activities: PropTypes.string,
  around: PropTypes.string,
  opinionStrong: PropTypes.string,
  opinionWeak: PropTypes.string,
  howToFind: PropTypes.string,
  client: PropTypes.object.isRequired,
};

export default BusinessEditGeneralInformationMore;
