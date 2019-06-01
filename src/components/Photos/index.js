import React from 'react';
import { compose } from 'redux';

import { withStyles } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import Badge from '@material-ui/core/Badge';
import Tooltip from '@material-ui/core/Tooltip';

import Add from '@material-ui/icons/Add';
import Clear from '@material-ui/icons/Clear';

// import ReactCrop, { makeAspectCrop } from 'react-image-crop/dist/ReactCrop';
// import 'react-image-crop/dist/ReactCrop.css';

import PhotosDialog from './PhotosDialog';
import ID from 'utils/generateId';

const styles = theme => ({
  thumb: {
    minWidth: 'auto',
    width: 50,
    // height: 49,
    margin: '4px',
    backgroundSize: 'contain',
  },
  badge: {
    // position: 'relative'
    top: -4,
    right: -4,
  },
});

/* eslint-disable react/prefer-stateless-function */
class Photos extends React.Component {
  constructor(props) {
    super(props);
    this.instanceId = ID();
    this.handleFile = this.handleFile.bind(this);
    this.handlePreview = this.handlePreview.bind(this);
    this.handleApply = this.handleApply.bind(this);
    this.handleRemove = this.handleRemove.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.handleCancel = this.handleCancel.bind(this);
    this.putCropZone = this.putCropZone.bind(this);

    this.aspectRatio = null;

    this.defaultCrop = {
      aspect: this.props.aspectWidth/this.props.aspectHeight,
    };

    this.state = {
      file: null,
      imageSrc: null,
      isStarted: false,
      result: null,
      width: null,
      height: null,
      crop: Object.assign({}, this.defaultCrop),
    };

    this.defaultState = Object.assign({}, this.state);
  }

  handleRemove(i) {
    // console.log('handleRemove', i);
    this.props.removePhoto(i);
  }

  handleSelect(i) {
    // console.log('handleSelect', i);
  }

  handleCancel(evt) {
    this.setState(this.defaultState);
  }

  calculateAspectRatioFit(srcWidth, srcHeight, maxWidth, maxHeight) {

    var ratio = Math.min(maxWidth / srcWidth, maxHeight / srcHeight);

    return { width: srcWidth*ratio, height: srcHeight*ratio };
  }

  handleApply(evt) {
    // createImageBitmap(this.state.imageSrc).then(function(imageBitmap) {
    var img = document.createElement('img');
    img.src = this.state.imageSrc;

    this.getCroppedImg(img, this.state.crop, 'exmpl.jpg').then((result) => {

      // console.log('promise resolved22', result);

      const blobReader = new FileReader();
      const blob = result;

      blobReader.addEventListener('loadend', (e) => {
        // console.log('blob, blobReader', blob, blobReader);

        this.props.addPhoto(blobReader.result);
        // let result = blobReader.result;
        //
        // this.setState({result});
        this.setState(this.defaultState);
        // this.setState({file: null, imageSrc: null, result: null});
      });

      blobReader.readAsDataURL(blob);
    });
    // });
  }

  handleFile(evt) {
    evt.preventDefault();

    const reader = new FileReader();
    const file = evt.target.files[0];

    if(file) {
      this.setState({ file });
    } else {
      return false;
    }


    reader.onloadend = () => {
      let img = document.createElement('img');
      img.src = reader.result;
      img.onload = () => {
        this.setState({ width: img.width, height: img.height });
        // console.log('img', img.width, img.height);
        // const cropObj = makeAspectCrop(
        //   {
        //   x: 0,
        //   y: 0,
        //   // aspect: 1 / 1,
        //   width: 50,
        // },
        //   img.width / img.height,
        // );
        // console.log('cropObj', cropObj);
        // this.setState({
        //   crop: cropObj,
        //   // crop: {
        //   //   aspect: 1,
        //   // },
        // });
      };
      this.setState({
        // file: file,
        imageSrc: reader.result,
      });
    };

    reader.readAsDataURL(file);
  }

  putCropZone() {
    var crop = this.defaultCrop;
    crop.width = 80;
    crop.height = 80;
    crop.x = 10;
    crop.y = 10;
    this.setState({ crop });
  }

  handlePreview(crop) {
    if(this.state.isStarted == false) {
      this.setState({ isStarted: true });
    }
    this.setState({ crop });
  }

  getCroppedImg(image, pixelCrop, fileName) {
    const canvas = document.createElement('canvas');
    const { width, height } = this.state;

    const pixelX = (width / 100) * pixelCrop.x;
    const pixelY = (height / 100) * pixelCrop.y;
    const pixelW = (width / 100) * pixelCrop.width;
    const pixelH = (height / 100) * pixelCrop.height;

    canvas.width = pixelW;
    canvas.height = pixelH;
    const ctx = canvas.getContext('2d');

    ctx.drawImage(image, pixelX, pixelY, pixelW, pixelH, 0, 0, pixelW, pixelH);

    return new Promise((resolve, reject) => {
      canvas.toBlob(file => {
        file.name = fileName;
        resolve(file);
      }, 'image/jpeg');
    });
  }

  handleDragStart() {
    // console.log('handleDragStart');
    // this.setState({isStarted: true});
  }

  render() {
    const thumbStyle = {
      minWidth: 'auto',
      // maxWidth: 50,
      width: 70,
      height: 70,
      margin: '4px',
    };


    const containerStyle = { marginTop: 10 };

    const { imageSrc } = this.state;

    const { photos, classes } = this.props;

    // console.log('photos from COMPONENT render', photos);

    const photosCnt = photos && photos.get('byId').valueSeq().size - 1;
    const dis = this.props.onlyOne && photosCnt >= 1;

    return (
      <div style={containerStyle}>
        {photos && photos
          .get('byId')
          .valueSeq()
          .map((photo, i) => {
            if (i == 0) {
              return false;
            }

            // photosCnt++;

            photo = photo.toJS();

            // let bgURL = window.URL.createObjectURL(photo);
            let bgStyle = { backgroundImage: `url(${photo.data})` };
            // console.log('photo', photo, i, photosCnt);
            // console.log('bgStyle', bgStyle, {...thumbStyle, ...bgStyle})
            let sizes = this.calculateAspectRatioFit(this.props.aspectWidth, this.props.aspectHeight, 70, 70);
            const thumbImgStyle = {
              minWidth: 'auto',
              width: sizes.width,
              height: sizes.height,
              // height: 49,
              // margin: '4px',
              backgroundSize: 'cover',
              margin: '4px',
              backgroundImage: `url(${photo.data})`,
            };

            return (
              <Badge
                key={ID()}
                badgeContent={<Clear />}
                color="primary"
                onClick={evt => {
                  evt.stopPropagation();
                  this.handleRemove(i);
                }}
                classes={{ badge: classes.badge }}
              >
                <Button
                  onClick={evt => {
                    evt.stopPropagation();
                    this.handleSelect(i);
                  }}
                  variant="contained"
                  className={classes.thumb}
                  style={thumbImgStyle}
                >
                  &nbsp;
                </Button>
              </Badge>
            );
          })}

        <input
          accept="image/*"
          // className={classes.input}
          style={{ display: 'none' }}
          id={"button-file_"+this.instanceId}
          onChange={this.handleFile}
          multiple
          type="file"
        />
        <label htmlFor={"button-file_"+this.instanceId}>
        <Tooltip title="Add photo">
          <Button disabled={dis} variant="contained" component="span" style={thumbStyle}>
            <Add />
          </Button>
        </Tooltip>

        </label>

        {imageSrc ? (
          <PhotosDialog
            open={true}
            actions={
              <React.Fragment>
                  <React.Fragment>
                    <Button style={{margin: 10}} variant="contained" onClick={this.handleCancel}>
                    Cancel
                    </Button>
                {this.state.isStarted && (
                    <Button style={{margin: 10}} variant="contained" color="primary" onClick={this.handleApply}>
                      Apply
                    </Button>)}
                  </React.Fragment>
                {this.state.isStarted || (
                  <Button onClick={this.putCropZone} color="secondary">Start dragging on the image.</Button>
                )}
              </React.Fragment>
            }
          >
            {/* <ReactCrop */}
            {/*   imageStyle={{ margin: 'auto', width: '100%' }} */}
            {/*   style={{ margin: 'auto' }} */}
            {/*   imageStyle={{maxHeight: 'none'}} */}
            {/*   keepSelection */}
            {/*   src={imageSrc} */}
            {/*   crop={this.state.crop} */}
            {/*   onChange={this.handlePreview} */}
            {/* /> */}

          </PhotosDialog>
        ) : (
          ''
        )}
      </div>
    );
  }
}

Photos.propTypes = {};

export default compose(withStyles(styles))(Photos);
