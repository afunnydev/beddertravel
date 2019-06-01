import { fromJS } from 'immutable';
import businessViewPropainerTwoReducer from '../reducer';

describe('businessViewPropainerTwoReducer', () => {
  it('returns the initial state', () => {
    expect(businessViewPropainerTwoReducer(undefined, {})).toEqual(fromJS({}));
  });
});
