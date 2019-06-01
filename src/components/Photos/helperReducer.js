import { fromJS } from 'immutable';

export const defaultEmptyPhotos = fromJS({
  byId: {
    '0': null,
  },
  allIds: ['0'],
});

export function removePhoto(photo, state, getIn = ['photos']) {
  var val;
  // console.log('here');
  let allIdsQ = getIn.slice(0);
  allIdsQ.push('allIds');
  let byIdQ = getIn.slice(0);
  byIdQ.push('byId');
  return state
    .updateIn(
      allIdsQ,
      allIds =>
        // console.log('allIds', allIds.get(action.removePhoto))
        allIds.filter((o, i) => i !== photo),
      // return allIds;
    )
    .updateIn(byIdQ, byId => {
      // console.log('byId', byId)
      const { [photo]: val, ...withoutRemoved } = byId;
      // return allIds.filter((o,i) => i !== photo);
      return byId.delete(`${photo}`);
    });
}

export function addPhoto(photo, state, getIn = ['photos']) {
  // console.log('addphoto', state);

  let allIdsQ = getIn.slice(0);
  allIdsQ.push('allIds');
  let byIdQ = getIn.slice(0);
  byIdQ.push('byId');

  var newId = '' + (parseInt(state.getIn(allIdsQ).last()) + 1);
  // console.log('newId', newId);

  return state
    .updateIn(allIdsQ, allIds =>
      // console.log('allIds', allIds)
      allIds.push(newId),
    )
    .updateIn(byIdQ, byId =>
      // console.log('byId', byId)
      byId.set(newId, fromJS({ data: photo, modelId: newId })),
    );
}
