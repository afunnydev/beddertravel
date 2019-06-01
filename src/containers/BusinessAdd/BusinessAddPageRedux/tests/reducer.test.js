import { fromJS } from 'immutable';
import businessAddPageReduxReducer from '../reducer';

describe('businessAddPageReduxReducer', () => {
  it('returns the initial state', () => {
    expect(businessAddPageReduxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
