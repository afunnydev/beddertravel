/**
 *
 * Asynchronously loads the component for BookingPropainerOne
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
