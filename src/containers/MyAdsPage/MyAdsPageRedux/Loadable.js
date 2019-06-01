/**
 *
 * Asynchronously loads the component for MyAdsPageRedux
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
