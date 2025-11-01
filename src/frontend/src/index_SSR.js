import React from "react";
import ReactDOM from "react-dom";
import store from "./redux/store.js";
import express from "express";
import { matchRoutes } from "react-router-config";
import routes from "./routes.js";
import Links from "./Links.js";
import renderer from "./helpers/renderer";
var path = require("path");

if (typeof window === "undefined") {
  const global = require("global");
  const window = require("global/window");
  const document = require("global/document");
}

const app = express();
app.use(express.static("ClientJS"));
app.get("*", (req, res) => {
  //const template = "<h1>" + "this is server template" + "</h1>";
  //  res.send(template);
  const promises = matchRoutes(routes, req.path)
    .map(({ route, match }) => {
      return route.loadStoreData
        ? route.loadStoreData(store, match, res)
        : null;
      //else return <NotFound />;
    })
    .map(promise => {
      if (promise) {
        return new Promise((resolve, reject) => {
          promise.then(resolve).catch(resolve);
        });
      }
    });

  Promise.all(promises).then(() => {
    const context = {};

    const content = renderer(req, store, context);
    if (context.notFound) {
      res.status(404);
    }
    res.send(content);
  });
});

app.listen(8080, () => {});
