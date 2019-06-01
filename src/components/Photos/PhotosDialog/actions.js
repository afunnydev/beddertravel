/*
 *
 * PhotosDialog actions
 *
 */

import { CHANGE_ASD, DSA } from './constants';

export function changeAsdAction(asd) {
  return {
    type: CHANGE_ASD,
    asd,
  };
}
export function dsaAction(dsa) {
  return {
    type: DSA,
    dsa,
  };
}
