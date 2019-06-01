/**
 *
 * Asynchronously loads the component for BusinessAddBedroomsRedux
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
