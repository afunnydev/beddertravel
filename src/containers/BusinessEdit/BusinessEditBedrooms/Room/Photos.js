import React from 'react';
import PropTypes from 'prop-types';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';

import AddIcon from '@material-ui/icons/LibraryAdd';
import Clear from '@material-ui/icons/Clear';

import uploadcare from 'uploadcare-widget';
import ID from 'utils/generateId';

const styles = {
  thumb: {
    minWidth: 'auto',
    height: 56,
    width: 56,
    backgroundSize: 'cover',
    margin: '4px',
  },
  badge: {
    top: 4,
    right: 4,
    padding: '0px 3px',
    minWidth: 'auto',
    cursor: 'pointer',
  },
  badgeColor: {
    backgroundColor: 'white',
    color: 'black',
    border: '1px solid black',
  },
  icon: {
    width: 12,
    height: 12,
  },
  addButton: {
    minWidth: 'auto', 
    margin: '4px 4px',
    height: 56,
    backgroundColor: 'white',
    color: 'rgba(75,63,143,0.25)',
    boxShadow: '0px 3px 3px rgba(0, 0, 0, 0.25)',
  }
};

const Photos = ({ classes, photos, addPhoto, removePhoto, photosInArray }) => {
  const openUploadcare = () => {
    uploadcare.openDialog(null, {
      crop: '1:1',
      imagesOnly: true,
      imageShrink: '600x600 90%'
    }).done((file) => {
      file.promise().done(async (fileInfo) => {
        addPhoto(fileInfo.cdnUrl);
        console.log('FILE', fileInfo.cdnUrl);
      });
    }).catch(err => {
      console.log('Err', err);
    });
  };

  return (
    <>
      {photosInArray
        ? photos.map((photo, i) => {
          const thumbImgStyle = {
            backgroundImage: `url(${photo})`,
          };

          return (
            <Badge
              key={ID()}
              badgeContent={<Clear classes={{ root: classes.icon }}/>}
              color="primary"
              onClick={evt => {
                evt.stopPropagation();
                removePhoto(i);
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
        : photos && photos
          .get('byId')
          .valueSeq()
          .map((photo, i) => {
            if (i == 0) {
              return false;
            }

            photo = photo.toJS();

            const thumbImgStyle = {
              backgroundImage: `url(${photo.data})`,
            };

            return (
              <Badge
                key={ID()}
                badgeContent={<Clear classes={{ root: classes.icon }}/>}
                color="primary"
                onClick={evt => {
                  evt.stopPropagation();
                  removePhoto(photo.modelId);
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

Photos.propTypes = {
  classes: PropTypes.object.isRequired,
  photos: PropTypes.oneOfType([
    PropTypes.object,
    PropTypes.array
  ]).isRequired,
  addPhoto: PropTypes.func.isRequired,
  removePhoto: PropTypes.func.isRequired,
  photosInArray: PropTypes.bool,
};

export default withStyles(styles)(Photos);
