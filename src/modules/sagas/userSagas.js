import { put } from "redux-saga/effects";
import * as actionCreators from "../actions";

export default function* loginSuccessCall() {
  yield put(actionCreators.textLoginSuccess({}));
}
