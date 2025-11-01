import React from "react";
import { Route, withRouter } from "react-router-dom";

//import Tweet from "./components/Tweet/Tweet.jsx";
import Login from "./components/Tweet/Login.jsx";
import LoginWrapper from "./components/Tweet/LoginWrapper.jsx";
//import NotFound from "./components/NotFound/NotFound.jsx";

export default [
  {
    path: "/",
    routes: [
      {
        component: Login,
        path: "/",
        exact: true
      },
      {
        component: Login,
        path: "/login",
        exact: true
      }

      /*  {
        ...Login,
        path: "/login"
      }*/
    ]
  }
];

/*
routes: [
  {
    ...Destination,
    path: "/",
    exact: true
  },

  {
    ...SpotInformation,
    path: "/spots/:slug"
  },

  {
    ...Gallery,
    path: "/gallery"
  },
  {
    component: NotFound
  }
]*/
