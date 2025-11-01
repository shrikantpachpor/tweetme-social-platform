import React from "react";
import { withRouter } from "react-router-dom";
import { matchRoutes } from "react-router-config";
import store from "../redux/store.js";

export const StaticRouteDataLoader = withRouter(
  class extends React.Component {
    constructor(props) {
      super(props);
      this.state = {};
    }

    componentWillReceiveProps(nextProps) {
      if (nextProps.location !== this.props.location) {
        matchRoutes(this.props.routes, nextProps.location).forEach(
          ({ route, match }) => {
            route.loadStoreData ? route.loadStoreData(store, match) : null;
          }
        );
      }
    }

    render() {
      return this.props.children;
    }
  }
);

export default StaticRouteDataLoader;
