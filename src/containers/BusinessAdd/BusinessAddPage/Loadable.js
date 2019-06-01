/**
 *
 * Asynchronously loads the component for BusinessAddPage
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
