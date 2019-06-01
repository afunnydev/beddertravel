import { fromJS } from 'immutable';
import myAdsPageReduxReducer from '../reducer';

describe('myAdsPageReduxReducer', () => {
  it('returns the initial state', () => {
    expect(myAdsPageReduxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
