import React, { PureComponent } from "react";
import { Form, Field, ErrorMessage } from "formik";
import CSRFToken from "./CSRFToken.jsx";
import getCsrfToken from "../../redux/actions/csrfActions.js";
import { withRouter } from "react-router-dom";
import { connect } from "react-redux";

export default class LoginForm extends React.Component {
  constructor(props) {
    super(props);
    //  this.token = getCsrfToken();
    this.state = {
      renderno: 0,
      csrftoken: ""
    };
  }

  componentDidMount() {
    // Component initialization
  }
  render() {
    return (
      <Form>
        <Field type="email" name="email" placeholder="email" />
        <ErrorMessage name="email" />
        <Field type="password" name="password" placeholder="password" />
        <ErrorMessage name="password" />

        <button type="submit"> Submit </button>
      </Form>
    );
  }
}

//export default withRouter(connect()(LoginForm));

/*<Field type="username" name="username" placeholder="username" />
<ErrorMessage name="username" />*/
