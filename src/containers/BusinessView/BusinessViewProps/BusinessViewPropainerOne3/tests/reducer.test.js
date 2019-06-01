import { fromJS } from 'immutable';
import businessViewPropainerOneReducer from '../reducer';

describe('businessViewPropainerOneReducer', () => {
  it('returns the initial state', () => {
    expect(businessViewPropainerOneReducer(undefined, {})).toEqual(fromJS({}));
  });
});
