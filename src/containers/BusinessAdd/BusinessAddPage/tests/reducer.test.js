import { fromJS } from 'immutable';
import businessAddPageReducer from '../reducer';

describe('businessAddPageReducer', () => {
  it('returns the initial state', () => {
    expect(businessAddPageReducer(undefined, {})).toEqual(fromJS({}));
  });
});
