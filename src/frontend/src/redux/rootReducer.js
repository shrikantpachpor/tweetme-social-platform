import { combineReducers } from "redux";
import tweetsReducer from "./reducers/tweetsReducer.js";
import loginReducer from "./reducers/loginReducer.js";
import destinationReducer from "./reducers/DestinationReducer.js";
import userReducer from "./reducers/userReducer.js";

const rootReducer = combineReducers({
  tweet: tweetsReducer,
  login: loginReducer,
  user: userReducer
});

export default rootReducer;
