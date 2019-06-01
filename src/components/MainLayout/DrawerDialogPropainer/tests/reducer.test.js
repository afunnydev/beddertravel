import { fromJS } from 'immutable';
import drawerDialogPropainerReducer from '../reducer';

describe('drawerDialogPropainerReducer', () => {
  it('returns the initial state', () => {
    expect(drawerDialogPropainerReducer(undefined, {})).toEqual(fromJS({}));
  });
});
