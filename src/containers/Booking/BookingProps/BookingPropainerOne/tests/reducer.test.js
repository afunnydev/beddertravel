import { fromJS } from 'immutable';
import bookingPropainerOneReducer from '../reducer';

describe('bookingPropainerOneReducer', () => {
  it('returns the initial state', () => {
    expect(bookingPropainerOneReducer(undefined, {})).toEqual(fromJS({}));
  });
});
