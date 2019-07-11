import {
  changeNameAction,
  changeMoodAction,
  changePropertyTypeAction,
  changeStarsAction,
  changeLocationAction,
  changeAmenitiesAction,
  changeLocationLatAction,
  changeLocationLngAction,
  locationApplyAction,
  changeOpinionStrongAction,
  changeOpinionWeakAction,
  changeAroundAction,
  changeHowToFindAction,
  processModelAction, 
  changeActivitiesAction,
  addCoverPhotoAction,
  removeCoverPhotoAction,
} from './actions';
import {
  makeSelectBusinessEditGeneralInformationRedux,
  makeSelectName,
  makeSelectMood,
  makeSelectPropertyType,
  makeSelectStars,
  makeSelectLocation,
  makeSelectAmenities,
  makeSelectLocationLat,
  makeSelectLocationLng,
  makeSelectOpinionStrong,
  makeSelectOpinionWeak,
  makeSelectAround,
  makeSelectHowToFind, 
  makeSelectCoverPhotos, 
  makeSelectActivities,
} from './selectors';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  businesseditgeneralinformationredux: makeSelectBusinessEditGeneralInformationRedux(),
  name: makeSelectName(),
  mood: makeSelectMood(),
  propertyType: makeSelectPropertyType(),
  stars: makeSelectStars(),
  location: makeSelectLocation(),
  amenities: makeSelectAmenities(),
  locationLat: makeSelectLocationLat(),
  locationLng: makeSelectLocationLng(),
  opinionStrong: makeSelectOpinionStrong(),
  opinionWeak: makeSelectOpinionWeak(),
  around: makeSelectAround(),
  howToFind: makeSelectHowToFind(),
  coverPhotos: makeSelectCoverPhotos(),
  activities: makeSelectActivities(),
});

function mapDispatchToProps(dispatch) {
  return {
    dispatch,
    processModel: evt => {
      dispatch(processModelAction(evt));
    },
    onChangeOpinionStrong: evt => {
      dispatch(changeOpinionStrongAction(evt.target.value));
    },
    onChangeOpinionWeak: evt => {
      dispatch(changeOpinionWeakAction(evt.target.value));
    },
    onChangeAround: evt => {
      dispatch(changeAroundAction(evt.target.value));
    },
    onChangeHowToFind: evt => {
      dispatch(changeHowToFindAction(evt.target.value));
    },
    onChangeActivities: evt => {
      dispatch(changeActivitiesAction(evt.target.value));
    },
    locationApply: evt => {
      dispatch(locationApplyAction(evt.target.value));
    },
    onChangeName: evt => {
      dispatch(changeNameAction(evt.target.value));
    },
    onChangeMood: evt => {
      dispatch(changeMoodAction(evt.target.value));
    },
    onChangePropertyType: evt => {
      dispatch(changePropertyTypeAction(evt.target.value));
    },
    onChangeStars: evt => {
      dispatch(changeStarsAction(evt));
    },
    onChangeLocation: evt => {
      dispatch(changeLocationAction(evt.target.value));
    },
    onChangeAmenities: evt => {
      dispatch(changeAmenitiesAction(evt));
    },
    onChangeLocationLat: evt => {
      dispatch(changeLocationLatAction(evt.target.value));
    },
    onChangeLocationLng: evt => {
      dispatch(changeLocationLngAction(evt.target.value));
    },
    onAddCoverPhoto: photo => {
      dispatch(addCoverPhotoAction(photo));
    },
    onRemoveCoverPhoto: index => {
      dispatch(removeCoverPhotoAction(index));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
