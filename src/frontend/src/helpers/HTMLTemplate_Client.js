import React from "react";
import store from "../redux/store.js";
import serialize from "serialize-javascript";

const HTMLTemplate_Client = () => {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>Document</title>
      <!--
        link
          rel="stylesheet"
          href="https://maxcdn.bootstrapcdn.com/bootstrap/3.3.7/css/bootstrap.min.css"
        /
      -->
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
  
    </head>
    <body class="main-body">
      <nav id="main-navigation"</nav>
      <main>
        <div id="destination"></div>
        <div id="destination-gallery"></div>
        <div id="carousel"></div>
        <div id="spot-information-sample"></div>
        
  </main>

</body>
</html>
`;
};

export default HTMLTemplate_Client;
