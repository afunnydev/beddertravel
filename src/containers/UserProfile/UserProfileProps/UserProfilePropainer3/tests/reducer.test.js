import { fromJS } from 'immutable';
import userProfilePropainer3Reducer from '../reducer';

describe('userProfilePropainer3Reducer', () => {
  it('returns the initial state', () => {
    expect(userProfilePropainer3Reducer(undefined, {})).toEqual(fromJS({}));
  });
});
