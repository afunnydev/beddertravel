/**
 *
 * Asynchronously loads the component for BusinessAddGeneralInformation
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
