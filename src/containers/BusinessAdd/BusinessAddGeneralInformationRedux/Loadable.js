/**
 *
 * Asynchronously loads the component for BusinessAddGeneralInformationRedux
 *
 */

import Loadable from 'react-loadable';

export default Loadable({
  loader: () => import('./index'),
  loading: () => null,
});
