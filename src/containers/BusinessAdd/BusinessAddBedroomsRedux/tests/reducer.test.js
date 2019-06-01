import { fromJS } from 'immutable';
import businessAddBedroomsReduxReducer from '../reducer';

describe('businessAddBedroomsReduxReducer', () => {
  it('returns the initial state', () => {
    expect(businessAddBedroomsReduxReducer(undefined, {})).toEqual(fromJS({}));
  });
});
