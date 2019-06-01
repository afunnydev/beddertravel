import { createStructuredSelector } from 'reselect';
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
} from './selectors'; // { makeSelectSearchBarRedux,

const mapStateToProps = createStructuredSelector({
  // searchbarredux: makeSelectSearchBarRedux(),

  locationText: makeSelectLocation(),
  from: makeSelectFrom(),
  to: makeSelectTo(),
  numPeople: makeSelectNumPeople(),
  numBed: makeSelectNumBed(),
  lat: makeSelectLat(),
  lon: makeSelectLon(),
});

function mapDispatchToProps(dispatch, props) {
  const changeTimeout = 3000;
  let changeTimer = null;
  const changeFunc = function () {
    // console.log('time2CHANJ');
  };

  return {
    dispatch,
    suggestionSelected: (evt) => {
      dispatch(suggestionSelectedAction(evt));
    },
    handleSubmit: (evt) => {
      dispatch(handleSubmitAction(evt));
    },
    onChangeLocation: (evt) => {
      clearTimeout(changeTimer);
      changeTimer = setTimeout(changeFunc, changeTimeout);
      dispatch(changeLocationAction(evt.target.value));
    },
    onChangeLat: (evt) => {
      dispatch(changeLatAction(evt));
    },
    onChangeLon: (evt) => {
      dispatch(changeLonAction(evt));
    },
    onChangeLocationByHand: (evt) => {
      dispatch(changeLocationAction(evt));
    },
    onChangeFrom: (evt) => {
      clearTimeout(changeTimer);
      changeTimer = setTimeout(changeFunc, changeTimeout);
      dispatch(changeFromAction(evt.target.value));
    },
    onChangeTo: (evt) => {
      clearTimeout(changeTimer);
      changeTimer = setTimeout(changeFunc, changeTimeout);
      dispatch(changeToAction(evt.target.value));
    },
    onChangeFromVal: (evt) => {
      clearTimeout(changeTimer);
      changeTimer = setTimeout(changeFunc, changeTimeout);
      dispatch(changeFromAction(evt));
    },
    onChangeToVal: (evt) => {
      clearTimeout(changeTimer);
      changeTimer = setTimeout(changeFunc, changeTimeout);
      dispatch(changeToAction(evt));
    },
    onChangeNumPeople: (evt) => {
      clearTimeout(changeTimer);
      changeTimer = setTimeout(changeFunc, changeTimeout);
      dispatch(changeNumPeopleAction(evt.target.value));
    },
    onChangeNumBed: (evt) => {
      clearTimeout(changeTimer);
      changeTimer = setTimeout(changeFunc, changeTimeout);
      dispatch(changeNumBedAction(evt.target.value));
    },
  };
}

export { mapStateToProps, mapDispatchToProps };
