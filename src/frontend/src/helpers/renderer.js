import React from "react";
import { renderToString } from "react-dom/server";
import { Provider } from "react-redux";
import store from "../redux/store.js";
import Routes from "../routes.js";
import { StaticRouter } from "react-router-dom";
import { renderRoutes } from "react-router-config";
import serialize from "serialize-javascript";

export default (req, store, context) => {
  const rootComponent = renderToString(
    <Provider store={store}>
      <StaticRouter location={req.path} context={context}>
        <div id="page">{renderRoutes(Routes)}</div>
      </StaticRouter>
    </Provider>
  );

  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <link
        href="http://netdna.bootstrapcdn.com/font-awesome/3.2.1/css/font-awesome.css"
        rel="stylesheet"
      />
      <link
        href="https://fonts.googleapis.com/icon?family=Material+Icons"
        rel="stylesheet"
      />
      <link
        rel="stylesheet"
        type="text/css"
        charset="UTF-8"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css"
      />
      <link
        rel="stylesheet"
        type="text/css"
        href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css"
      />
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
      />
      <link
        rel="stylesheet"
       type="text/css"
        href="/bundle.css"
      />
    </head>
    <body class="main-body">
    

        <div id="root">${rootComponent}</div>
    
        



  <script src="/bundle.js"></script>
</body>
</html>
`;
};
/*
<script>
  window.INITIAL_STATE=${serialize(store.getState())};
</script>
*/
