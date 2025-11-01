import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter, Switch, Route } from "react-router-dom";

// Import components
import HomePage from "./components/Tweet/HomePage.jsx";
import Login from "./components/Tweet/Login.jsx";
import UserProfile from "./components/UserProfile/UserProfile.jsx";

// Cleaned up - removed old commented code
// Fixed React Router implementation
ReactDOM.render(
  <Provider store={store}>
    <BrowserRouter>
      <Switch>
        <Route exact path="/" render={() => <HomePage />} />
        <Route path="/:userId" render={(props) => <UserProfile {...props} />} />
      </Switch>
    </BrowserRouter>
  </Provider>,
  document.getElementById("root")
);
// Clean implementation - ready for production
