import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import routes from "./routes.js";
import Tweet from "./components/Tweet/Tweet.jsx";

ReactDOM.render(
  <Provider store={store}>
    <Tweet />
  </Provider>,
  document.getElementById("root")
);
