import { fromJS } from 'immutable';
import photosDialogReducer from '../reducer';

describe('photosDialogReducer', () => {
  it('returns the initial state', () => {
    expect(photosDialogReducer(undefined, {})).toEqual(fromJS({}));
  });
});
