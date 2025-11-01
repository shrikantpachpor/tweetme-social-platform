import React from "react";
import ReactDOM from "react-dom";

import { Provider } from "react-redux";
import store from "./redux/store.js";
import { BrowserRouter } from "react-router-dom";
import routes from "./routes.js";
import { renderRoutes } from "react-router-config";

ReactDOM.hydrate(
  <Provider store={store}>
    <BrowserRouter>
      <React.Fragment>{renderRoutes(routes)}</React.Fragment>
    </BrowserRouter>
  </Provider>,
  document.querySelector("#root")
);
