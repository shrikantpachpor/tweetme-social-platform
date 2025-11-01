import { GET_CSRF_TOKEN, CHECK_CSRF_TOKEN } from "../types.js";

const csrfInitialState = {
  csrfToken: null
};
const csrfReducer = (state = csrfInitialState, action) => {
  switch (action.type) {
    case CHECK_CSRF_TOKEN:
      return { ...state, csrfToken: action.payload };
      break;
    default:
      return state;
  }
};

export default csrfReducer;
