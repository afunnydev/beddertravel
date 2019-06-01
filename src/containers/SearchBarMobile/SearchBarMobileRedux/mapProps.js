import {
  changeLocationAction,
  changeFromAction,
  changeToAction,
  changeNumPeopleAction,
  changeNumBedAction,
  suggestionSelectedAction,
  handleSubmitAction, changeLatAction, changeLonAction,
} from './actions';
import {
  makeSelectLocation,
  makeSelectFrom,
  makeSelectTo,
  makeSelectNumPeople,
  makeSelectNumBed, makeSelectLat, makeSelectLon,
} from './selectors'; //{ makeSelectSearchBarRedux,
import { createStructuredSelector } from 'reselect';

const mapStateToProps = createStructuredSelector({
  //searchbarredux: makeSelectSearchBarRedux(),

  locationText: makeSelectLocation(),
  from: makeSelectFrom(),
  to: makeSelectTo(),
  numPeople: makeSelectNumPeople(),
  numBed: makeSelectNumBed(),
  lat: makeSelectLat(),
  lon: makeSelectLon(),
});

function mapDispatchToProps(dispatch, props) {
  return {
    dispatch,

    suggestionSelected: evt => {
      dispatch(suggestionSelectedAction(evt.target.value));
    },
    handleSubmit: evt => {
      dispatch(handleSubmitAction(evt));
    },
    onChangeLocation: evt => {
      dispatch(changeLocationAction(evt.target.value));
    },
    onChangeLat: evt => {
      dispatch(changeLatAction(evt));
    },
    onChangeLon: evt => {
      dispatch(changeLonAction(evt));
    },
    onChangeLocationByHand: evt => {
      dispatch(changeLocationAction(evt));
    },
    onChangeFrom: evt => {
      // let to = props.to;
      // console.log('propstoooooo', props)
      dispatch(changeFromAction(evt.target.value));
    },
    onChangeTo: evt => {
      dispatch(changeToAction(evt.target.value));
    },
    onChangeFromVal: evt => {
      // let to = makeSelectTo()();
      // console.log('propstoooooo', to)
      dispatch(changeFromAction(evt));
    },
    onChangeToVal: evt => {
      dispatch(changeToAction(evt));
    },
    onChangeNumPeople: evt => {
      dispatch(changeNumPeopleAction(evt.target.value));
    },
    onChangeNumBed: evt => {
      dispatch(changeNumBedAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
