import { takeLatest } from "redux-saga/effects";
import * as actionTypes from "../actions/actionTypes";
import loginSuccessCall from "./userSagas";

export default function* mySaga() {
  yield takeLatest(actionTypes.LOGIN_SUCCESS, loginSuccessCall);
}
