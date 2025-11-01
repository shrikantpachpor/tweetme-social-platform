import React, { useState } from "react";
import { connect } from "react-redux";
//import SignupForm from "./Login.jsx";
import LoginForm from "./LoginForm.jsx";
import * as yup from "yup";
import { withFormik } from "formik";
import axios from "axios";
import { getCookie } from "../../utils/utils.js";
import Cookies from "js-cookie";
import {
  getCsrfToken,
  attachCsrfToken
} from "../../redux/actions/csrfActions.js";
import { CHECK_LOGIN_STATUS } from "../../redux/types.js";
import { checkLoginStatus, loginUser } from "../../redux/actions/loginActions.js";


/*class Tweet extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <SignupForm />
      </div>
    );
  }
}

export default connect()(Tweet);*/
//const LoginWrapper = Login;
const initialValues = { email: "", password: "" };

const LoginValidation = yup.object().shape({
  //  username: yup
  //    .string()
  //  .max(20, "Must be 20 characters or less")
  //    .required(),
  email: yup
    .string()
    .email()
    .required(),
  password: yup
    .string()
    .min(8)
    .max(16)
    //.matches("^(?=.*[a-z])(?=.*[A-Z])(?=.*d)[a-zA-Zd]$")
    .required()
});

const LoginChecker = withFormik({
  // Handles our submission

  handleSubmit: async (values, { props, setSubmitting }) => {
    try {
      const result = await props.loginUser(values);
      
      if (result === 1) {
        window.location.reload();
      } else {
        alert("Login failed. Please check your credentials.");
      }
    } catch (error) {
      alert("Login error occurred. Please try again.");
    }
    
    setSubmitting(false);
  },
  initialValues: { initialValues },
  validationSchema: LoginValidation
})(LoginForm);

const mapStateToProps = state => ({
  login: state.login.loginStatus
});

const mapDispachToProps = {
  checkLoginStatus,
  loginUser
};

const LoginWrapper = connect(
  mapStateToProps,
  mapDispachToProps
)(LoginChecker);

export default LoginWrapper;

//export default LoginWrapper(LoginForm);

//export default { component: LoginWrapper };
