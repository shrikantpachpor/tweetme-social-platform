import React from "react";
import { Form, Field, ErrorMessage } from "formik";
import "./css/tweet-post-form.css";
import store from "../../redux/store.js";

export default class TweetPostForm extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tweetPlaceHolder = this.props.placeholderText
      ? this.props.placeholderText
      : "What's happening?";
    return (
      <div
        className={
          this.props.type && this.props.type === "Reply"
            ? "tweet-post-form tweet-reply-form"
            : "tweet-post-form"
        }
      >
        <Form onSubmit={this.props.handleSubmit}>
          <Field
            className="tweet-post-field"
            name="tweet"
            type="textarea"
            placeholder={tweetPlaceHolder}
          />
          <ErrorMessage name="tweet" />
          {this.props.type && this.props.type === "Reply" ? (
            <button
              onClick={() => {
                this.props.cancelButtonFunction(0);
              }}
              className="tweet-button cancel"
              type="button"
            >
              <b>Cancel</b>
            </button>
          ) : null}
          <button
            className={
              this.props.type && this.props.type === "Reply"
                ? "tweet-button reply"
                : "tweet-button"
            }
            type="submit"

          >
            <b>
              {this.props.type && this.props.type === "Reply"
                ? this.props.submitButtonText
                : "Tweet"}
            </b>
          </button>
        </Form>
      </div>
    );
  }
}
