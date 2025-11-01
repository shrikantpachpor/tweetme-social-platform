import { CHECK_LOGIN_STATUS } from "../types.js";

const loginInitialState = {
  loginStatus: 0
};
const loginReducer = (state = loginInitialState, action) => {
  switch (action.type) {
    case CHECK_LOGIN_STATUS:
      return { ...state, loginStatus: action.payload };
      break;
    default:
      return state;
  }
};

export default loginReducer;
