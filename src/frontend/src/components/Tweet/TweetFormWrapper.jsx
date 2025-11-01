import React, { useState } from "react";
import { connect } from "react-redux";
//import SignupForm from "./Login.jsx";
import TweetPostForm from "./TweetPostForm.jsx";
import * as yup from "yup";
import { withFormik } from "formik";
import axios from "axios";
import { getCookie } from "../../utils/utils.js";
import Cookies from "js-cookie";
import {
  getCsrfToken,
  attachCsrfToken
} from "../../redux/actions/csrfActions.js";
import { POST_TWEET, GET_GENERAL_TWEETS } from "../../redux/types.js";
import { postTweet, getData } from "../../redux/actions/tweetsActions.js";
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
const initialValues = { tweet: " " };

const TweetFormValidation = yup.object().shape({
  //  username: yup
  //    .string()
  //  .max(20, "Must be 20 characters or less")
  //    .required(),
  tweet: yup
    .string()
    .required()
    .min(1)
    .max(241)
});

const TweetFormChecker = withFormik({
  // Handles our submission

  initialValues: { initialValues },
  enableReinitialize: "true",
  validationSchema: TweetFormValidation,
  validateOnBlur: false,

  handleSubmit: (values, { props, setSubmitting, resetForm, validateForm }) => {
    validateForm();

    if (values.type && values.type === "Reply") {
      props
        .postTweet(values, "Reply")
        .then(success => {
          // Tweet posted successfully
        })
        .then(success => {
          props.cancelButtonFunction(0);
        })
        .then(success => {
          props.getData(
            GET_GENERAL_TWEETS,
            "http://localhost:8000/api/tweets/"
          );
        });
    } else {
      props
        .postTweet(values, "Original")
        .then(success => {
          // Tweet posted successfully
        })
        .then(success => {
          props.getData(
            GET_GENERAL_TWEETS,
            "http://localhost:8000/api/tweets/"
          );
        });
    }
    
    resetForm({ values: { tweet: " " } });
    setTimeout(() => setSubmitting(false), 3 * 1000);
  }
})(TweetPostForm);
const mapStateToProps = state => ({
  tweet_post_status: state.tweet.tweet_post_status
});

const mapDispachToProps = {
  postTweet,
  getData
};

const TweetFormWrapper = connect(
  mapStateToProps,
  mapDispachToProps
)(TweetFormChecker);

export default TweetFormWrapper;
