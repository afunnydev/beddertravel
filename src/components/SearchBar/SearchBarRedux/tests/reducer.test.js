import { fromJS } from 'immutable';
import searchBarReduxReducer from '../reducer';

describe('searchBarReduxReducer', () => {
  it('returns the initial state', () => {
    expect(searchBarReduxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
