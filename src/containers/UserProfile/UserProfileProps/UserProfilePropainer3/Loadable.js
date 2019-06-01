/**
 *
 * Asynchronously loads the component for UserProfilePropainer3
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
