import {
  // changeResultAction,
  // changeErrorAction,
  // changeValidationErrorAction,
  // changeSubmittingAction,
  changeModelIdAction,
  // submitAction,
  submitModelAction,
} from '../BusinessEditPageRedux/actions';

export function changeModelIdThunk(modelId) {
  // console.log('YEAH!!', modelId);
  return function (dispatch, getState) {

    // console.log('getState', getState());

    return new Promise((resolve) => resolve(dispatch(changeModelIdAction(modelId))))
    .then(() => {
      dispatch(submitModelAction(modelId))
      // dispatch(changeModelIdAction(modelId));
      // console.log('getState', getState());/
      // console.log('DONE ', modelId)
    });

    // let username = makeSelectUsername()(getState());
    // let password = makeSelectPassword()(getState());
    // dispatch(changeModelIdAction(modelId)).then(
      // () => {
        // return Promise.resolve();
        // console.log('DONE ', modelId)
      // }
    // );
    // console.log('YEAH', modelId, getState());

    // if(username.length > 0 && password.length > 0) {
    //   dispatch(userLoginAction());
    //
    //   fetch(BedderConfig.getApiUrl() + '/user/token', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify({
    //       email: username,
    //       password: password,
    //     })
    //   })
    //   .then(response => { return response.json() })
    //   .then(
    //     res => {
    //       console.log('res', res);
    //
    //       dispatch(userLoginSuccessAction(res));
    //
    //       if(res.token) {
    //         Bedder.setToken(res.token);
    //         Bedder.setUser(res.user);
    //         Bedder.login(dispatch);
    //         // console.log('setting mf token for user ', res.user);
    //         // dispatch(appContextUserLoginAction(res.user));
    //       }
    //
    //     },
    //   ).catch( error => {
    //     console.log('should errror here', error);
    //     dispatch(userLoginErrorAction(error));
    //   });
    // }
    // return Promise.resolve();

  }
}
