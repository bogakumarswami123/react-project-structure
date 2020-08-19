import * as ActionTypes from "./actionTypes";

export const loginSuccess = (data) => ({
  type: ActionTypes.LOGIN_SUCCESS,
  data,
});

export const textLoginSuccess = (data) => ({
  type: ActionTypes.TEST_LOGIN_SUCCESS,
  data,
});
