import React from "react";
import { matchRoutes, renderRoutes } from "react-router-config";

import routes from "../routes.js";
import store from "../redux/store.js";
export function componentStoreData(props) {
  const promises = matchRoutes(routes, props.location.pathname)
    .map(({ route, match }) => {
      return route.loadStoreData ? route.loadStoreData(store, match) : null;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });
  Promise.all(promises);
}

export default componentStoreData;
