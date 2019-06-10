import { fromJS } from 'immutable';
import businessAddGeneralInformationReduxReducer from '../reducer';

describe('businessAddGeneralInformationReduxReducer', () => {
  it('returns the initial state', () => {
    expect(businessAddGeneralInformationReduxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
