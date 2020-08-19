import * as actionTypes from "../actions/actionTypes";

const initialState = {
  profile: {},
};

export default (state = initialState, { type, data }) => {
  switch (type) {
    case actionTypes.LOGIN_SUCCESS:
      return data;
    default:
      return state;
  }
};
