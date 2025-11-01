import React from "react";
import {
  GET_USER_PROFILE,
  TOGGLE_LIKE,
  RETWEET_TWEET,
  DELETE_TWEET,
  GET_GENERAL_TWEETS
} from "../../redux/types.js";
import { Link } from "react-router-dom";
import TweetFormWrapper from "./TweetFormWrapper.jsx";

//import heartIcon from "./imgs/icons/iconmonstr-heart-thin-24.png";
class Tweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tweetSubmenu: 0,
      deleteTweet: 0,
      togglePopup: 0,
      commentPost: 0
    };
    this.toggleSubmenu = this.toggleSubMenu.bind(this);
    this.handleDelete = this.handleDelete.bind(this);
    this.togglePopup = this.togglePopup.bind(this);
    this.handleCommentPost = this.handleCommentPost.bind(this);
  }

  toggleSubMenu() {
    this.setState({ tweetSubmenu: !this.state.tweetSubmenu });
    return;
  }
  handleDelete(e) {
    this.setState({ deleteTweet: e });
    return;
  }
  togglePopup(e) {
    this.setState({ togglePopup: e, tweetSubmenu: 0 });
  }
  handleCommentPost(e) {
    this.setState({ commentPost: e });
  }
  render() {
    /*  let deleteConfirm;
    if (this.state.togglePopup) {
      deleteConfirm = (
        <React.Fragment>
          <div
            onClick={() => {
              this.togglePopup(0);
            }}
            className="delete-confirm"
          />
          <div className="delete-confirm-message">
            <p className="delete-message-text">
              Are you sure you want to delete this tweet?
            </p>
            <div
              onClick={() => {
                this.togglePopup(0);
              }}
              className="confirm-button cancel"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                this.props.deleteTweet(DELETE_TWEET, tweet.id);
                this.togglePopup(0);
              }}
              className="confirm-button confirm"
            >
              Yes
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      deleteConfirm = null;
    }*/
    let deleteConfirm;
    if (this.state.togglePopup) {
      deleteConfirm = (
        <React.Fragment>
          <div
            onClick={() => {
              this.togglePopup(0);
            }}
            className="confirmation-popup"
          />
          <div className="confirmation-message">
            <p className="confirmation-message-text">
              Are you sure you want to delete this tweet?
            </p>
            <div
              onClick={() => {
                this.togglePopup(0);
              }}
              className="confirm-button cancel"
            >
              Cancel
            </div>
            <div
              onClick={() => {
                this.props
                  .deleteTweet(DELETE_TWEET, tweet.id)
                  .then(success => {
                    this.togglePopup(0);
                  })
                  .then(success => {
                    this.props.getData(
                      GET_GENERAL_TWEETS,
                      "http://localhost:8000/api/tweets/"
                    );
                  });
              }}
              className="confirm-button confirm"
            >
              Yes
            </div>
          </div>
        </React.Fragment>
      );
    } else {
      deleteConfirm = null;
    }

    const tweet = this.props.tweet;

    const tweetOwnerName = tweet.owner.first_name + " " + tweet.owner.last_name;
    let tweetParentName;
    if (tweet.type === "Retweet" || tweet.type === "Reply") {
      tweetParentName =
        tweet.parent.owner.first_name + " " + tweet.parent.owner.last_name;
    }
    let retweetCount;
    if (tweet) {
      if (tweet.type === "Retweet") {
        if (tweet.parent) {
          retweetCount = tweet.parent.retweet_count;
        } else {
          retweetCount = null;
        }
      } else {
        retweetCount = tweet.retweet_count;
      }
    } else {
      retweetCount = null;
    }


    return (
      <div
        className="individual-tweet"
        style={{
          paddingTop: "20px",
          paddingBottom: "25px",
          paddingRight: "10px",
          paddingLeft: "10px"
        }}
      >
        {deleteConfirm}
        {tweet.type === "Retweet" ? (
          <p
            style={{
              fontSize: "14px",
              color: `rgb(230, 236, 240)`,
              textDecoration: "none",
              padding: "0",
              margin: "0"
            }}
            className="retweet-owner-style"
          >
            <Link to={`/${tweet.owner.id}`}>
              <i className="fa fa-retweet retweet-icon" />
              &nbsp;
              {tweetOwnerName} retweeted
            </Link>
          </p>
        ) : null}
        {tweet.type === "Reply" ? (
          <p
            style={{
              fontSize: "14px",
              color: `rgb(230, 236, 240)`,
              textDecoration: "none",
              padding: "0",
              margin: "0"
            }}
            className="retweet-owner-style"
          >
            <Link to={`/${tweet.parent.owner.id}`}>
              <i className="fa fa-reply retweet-icon" />
              &nbsp; replied to @{tweet.parent.owner.username}
            </Link>
          </p>
        ) : null}
        <Link
          to={
            tweet.type === "Retweet"
              ? `/${tweet.parent.owner.id}/`
              : `/${tweet.owner.id}/`
          }
          className="tweet-owner"
        >
          <span
            className="tweet-owner-name"
            style={{ color: "black", fontSize: "15px" }}
          >
            <b>{tweet.type === "Retweet" ? tweetParentName : tweetOwnerName}</b>
          </span>
          {this.props.singleTweetPage ? <br /> : "\u00A0"}
          <span style={{}}>@{tweet.owner.username}</span>
        </Link>
        <div
          style={
            tweet.if_tweet_owner
              ? { display: "inline-block" }
              : { display: "none" }
          }
          className={
            this.props.singleTweetPage
              ? "tweet-submenu-container tweet-submenu-singlepage-container"
              : "tweet-submenu-container"
          }
        >
          <i
            onClick={() => {
              this.toggleSubMenu();
            }}
            className="fa fa-chevron-down tweet-submenu-popup"
            aria-hidden="true"
          />

          <div
            onClick={() => {
              this.togglePopup(1);
            }}
            style={
              this.state.tweetSubmenu
                ? { display: "visible" }
                : { visibility: "hidden" }
            }
            className="tweet-delete-button"
          >
            Delete
          </div>
        </div>

        <p style={{ fontSize: "17px" }} className="tweet-content">
          {tweet.content}
        </p>
        <p style={{ fontSize: "12px", paddingBottom: "10px" }}>
          posted on:{tweet.created_date}
        </p>

        <span className="chat-icons">
          <i
            onClick={() => this.handleCommentPost(!this.state.commentPost)}
            className="fa fa-comment-o chat-icon"
          />
          <span className="chat-counts">
            {tweet.type && tweet.type === "Retweet"
              ? tweet.parent.reply_count
              : tweet.reply_count}
          </span>
        </span>
        <span className="chat-icons">
          <i
            onClick={() =>
              this.props.toggleLike(this.props.actionType, tweet.id)
            }
            className={
              (tweet.type === "Retweet"
              ? tweet.parent.if_liked
              : tweet.if_liked)
                ? "fa fa-heart chat-icon clicked"
                : "fa fa-heart-o chat-icon"
            }
          />
          <span className="chat-counts">
            {tweet.type === "Retweet"
              ? tweet.parent.likes_count
              : tweet.likes_count}
          </span>
        </span>
        <span className="chat-icons">
          <i
            className="fa fa-retweet chat-icon"
            onClick={() => {
              this.props
                .postTweet(tweet.id, "Retweet", RETWEET_TWEET)
                .then(success => {
                  this.props.getData(
                    GET_GENERAL_TWEETS,
                    "http://localhost:8000/api/tweets/"
                  );
                });
            }}
          />
          <span className="chat-counts">{retweetCount}</span>
        </span>
        <span className="chat-icons">
          <i className="fa fa-upload chat-icon" aria-hidden="true" />
        </span>
        {this.state.commentPost ? (
          <div className="reply-form">
            <TweetFormWrapper
              type={"Reply"}
              placeholderText={"Tweet Your Reply"}
              submitButtonText={"Reply"}
              tweetParentId={tweet.id}
              additionalCssClass={"reply-form"}
              cancelButtonFunction={this.handleCommentPost}
            />
          </div>
        ) : null}
      </div>
    );
  }
}

export default Tweet;
