import {
  changeNameAction,
  changeMoodAction,
  changePropertyTypeAction,
  changeStarsAction,
  changeLocationAction,
  changeAmenitiesAction,
  changeAmenityAirConditionerAction,
  changeAmenityFitnessAction,
  changeAmenitySpaAction,
  changeLocationLatAction,
  changeLocationLngAction,
  locationApplyAction,
  changeOpinionStrongAction,
  changeOpinionWeakAction,
  changeAroundAction,
  changeEmailAction,
  changeHowToFindAction,
  processModelAction, changeCoverPhotoAction, changeActivitiesAction,
} from './actions';
import {
  makeSelectBusinessEditGeneralInformationRedux,
  makeSelectName,
  makeSelectMood,
  makeSelectPropertyType,
  makeSelectStars,
  makeSelectLocation,
  makeSelectEmail,
  makeSelectAmenities,
  makeSelectAmenityAirConditioner,
  makeSelectAmenityFitness,
  makeSelectAmenitySpa,
  makeSelectLocationLat,
  makeSelectLocationLng,
  makeSelectOpinionStrong,
  makeSelectOpinionWeak,
  makeSelectAround,
  makeSelectHowToFind, makeSelectCoverPhoto, makeSelectActivities,
} from './selectors';
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  businesseditgeneralinformationredux: makeSelectBusinessEditGeneralInformationRedux(),

  name: makeSelectName(),
  email: makeSelectEmail(),
  mood: makeSelectMood(),
  propertyType: makeSelectPropertyType(),
  stars: makeSelectStars(),
  location: makeSelectLocation(),
  amenities: makeSelectAmenities(),
  amenityAirConditioner: makeSelectAmenityAirConditioner(),
  amenityFitness: makeSelectAmenityFitness(),
  amenitySpa: makeSelectAmenitySpa(),
  locationLat: makeSelectLocationLat(),
  locationLng: makeSelectLocationLng(),
  opinionStrong: makeSelectOpinionStrong(),
  opinionWeak: makeSelectOpinionWeak(),
  around: makeSelectAround(),
  howToFind: makeSelectHowToFind(),
  coverPhoto: makeSelectCoverPhoto(),
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
      // console.log('rearry', evt)
      dispatch(changeAroundAction(evt.target.value));
    },
    onChangeHowToFind: evt => {
      dispatch(changeHowToFindAction(evt.target.value));
    },
    onChangeActivities: evt => {
      dispatch(changeActivitiesAction(evt.target.value));
    },
    onChangeCoverPhoto: evt => {
      dispatch(changeCoverPhotoAction(evt));
    },
    onChangeEmail: evt => {
      dispatch(changeEmailAction(evt.target.value));
    },
    locationApply: evt => {
      dispatch(locationApplyAction(evt.target.value));
    },
    onChangeName: evt => {
      // console.log('changeNameAction onChangeName', evt);
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
    onChangeAmenityAirConditioner: evt => {
      dispatch(changeAmenityAirConditionerAction());
    },
    onChangeAmenityFitness: evt => {
      dispatch(changeAmenityFitnessAction());
    },
    onChangeAmenitySpa: evt => {
      dispatch(changeAmenitySpaAction());
    },
    onChangeLocationLat: evt => {
      dispatch(changeLocationLatAction(evt.target.value));
    },
    onChangeLocationLng: evt => {
      dispatch(changeLocationLngAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
