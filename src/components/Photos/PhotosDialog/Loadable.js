/**
 *
 * Asynchronously loads the component for PhotosDialog
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
