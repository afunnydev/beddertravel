import React from 'react';
import PropTypes from 'prop-types';
import uploadcare from 'uploadcare-widget';
import gql from 'graphql-tag';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import AddIcon from '@material-ui/icons/LibraryAdd';
import Clear from '@material-ui/icons/Clear';

import photosStyles from './photosStyles';

const Photos = ({ classes, photos, crop, shrink, id, client, addMutation, removeMutation }) => {
  const openUploadcare = () => {
    uploadcare.openDialog(null, {
      crop,
      imagesOnly: true,
      imageShrink: shrink
    }).done((file) => {
      file.promise().done(async (fileInfo) => {
        await addPhotoApollo(fileInfo);
      });
    }).catch(err => {
      console.log('Err', err);
    });
  };

  const addPhotoApollo = async (fileInfo) => {
    const ADD_PHOTO_MUTATION = gql`
      mutation ADD_PHOTO_MUTATION($modelId: Int!, $uuid: String!, $url: String!) {
        ${addMutation}(modelId: $modelId, uuid: $uuid, url: $url) @client(always: true) {
          uuid
        }
      }
    `;
    const res = await client.mutate({
      mutation: ADD_PHOTO_MUTATION,
      variables: {
        modelId: id,
        uuid: fileInfo.uuid,
        url: fileInfo.cdnUrl,
      }
    });
    console.log(res);
  };

  const removePhotoApollo = async (index) => {
    const REMOVE_PHOTO_MUTATION = gql`
      mutation REMOVE_PHOTO_MUTATION($modelId: Int!, $index: Int!) {
        ${removeMutation}(modelId: $modelId, index: $index) @client(always: true)
      }
    `;
    const res = await client.mutate({
      mutation: REMOVE_PHOTO_MUTATION,
      variables: {
        modelId: id,
        index,
      }
    });
    console.log(res);
  };

  return (
    <>
      {photos && photos.length
        ? photos.map((photo, i) => {
          const thumbImgStyle = {
            backgroundImage: `url(${photo.url})`,
          };
          return (
            <Badge
              key={photo.id}
              badgeContent={<Clear classes={{ root: classes.icon }}/>}
              color="primary"
              onClick={async evt => {
                evt.stopPropagation();
                await removePhotoApollo(i);
              }}
              classes={{ badge: classes.badge, colorPrimary: classes.badgeColor }}
            >
              <Button
                variant="contained"
                classes={{ root: classes.thumb }}
                style={thumbImgStyle}
                disableRipple
                disableFocusRipple
              >
                &nbsp;
              </Button>
            </Badge>
          );
        })
        : null
      }
      <Button
        variant="contained"
        onClick={openUploadcare}
        classes={{ root: classes.addButton }}
      >
        <AddIcon />
      </Button>
    </>
  );
};

Photos.defaultProps = {
  shrink: '600x600 90%',
  crop: '1:1'
};

Photos.propTypes = {
  classes: PropTypes.object.isRequired,
  // photos is not required because a new user or business has undefined
  photos: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]),
  addMutation: PropTypes.string.isRequired,
  removeMutation: PropTypes.string.isRequired,
  shrink: PropTypes.string,
  crop: PropTypes.string,
  id: PropTypes.number,
  client: PropTypes.object,
};

export default withStyles(photosStyles)(Photos);