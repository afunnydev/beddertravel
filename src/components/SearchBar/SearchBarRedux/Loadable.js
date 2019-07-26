/**
 *
 * Asynchronously loads the component for SearchBarRedux
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
