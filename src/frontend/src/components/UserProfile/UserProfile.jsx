import React from "react";
import { connect } from "react-redux";
import {
  getUserProfile,
  toggleFollow
} from "../../redux/actions/profileActions.js";
import { getUserTweets } from "../../redux/actions/userActions.js";
import "./css/profiles.css";
import { headingCase } from "../../utils/utils.js";
import TweetsList from "../Tweet/TweetsList.jsx";

import {
  GET_USER_PROFILE,
  GET_USER_ORIGINAL_TWEETS,
  TOGGLE_FOLLOW,
  UPDATE_USER_ORIGINAL_TWEET
} from "../../redux/types.js";

class UserProfile extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      followButtonText: "Following",
      updateComponent: 0
    };
    this.handleMouseEnter = this.handleMouseEnter.bind(this);
    this.handleMouseLeave = this.handleMouseLeave.bind(this);
    this.collectTweets = this.collectTweets.bind(this);
  }
  collectTweets() {
    this.setState({ updateComponent: !this.state.updateComponent });
    return;
  }
  handleMouseEnter(e) {
    e.preventDefault();
    this.setState({ followButtonText: "Unfollow" });
    return;
  }
  handleMouseLeave(e) {
    e.preventDefault();
    this.setState({ followButtonText: "Following" });
    return;
  }
  componentDidMount() {
    if (
      !this.props.user ||
      this.props.user.user.id !== this.props.match.params.userId
    ) {
      this.props
        .getUserProfile(GET_USER_PROFILE, this.props.match.params.userId)
        .then(
          this.props.getUserTweets(
            GET_USER_ORIGINAL_TWEETS,
            this.props.match.params.userId
          )
        );
    }
  }
  render() {
    const userFullName = this.props.profile
      ? this.props.profile.user.first_name +
        " " +
        this.props.profile.user.last_name
      : "";
    let followButton;
    if (this.props.profile && this.props.profile.is_following) {
      followButton = (
        <div
          onClick={() => {
            this.props.toggleFollow(GET_USER_PROFILE, this.props.profile.id);
          }}
          onMouseEnter={e => this.handleMouseEnter(e)}
          onMouseLeave={e => this.handleMouseLeave(e)}
          className="following-button"
        >
          <span className="twitter-button-text style-following">
            <b>{this.state.followButtonText}</b>
          </span>
        </div>
      );
    } else {
      followButton = (
        <div
          onClick={() => {
            this.props.toggleFollow(GET_USER_PROFILE, this.props.profile.id);
          }}
          className="follow-button"
        >
          <span className="twitter-button-text">
            <b>Follow</b>
          </span>
        </div>
      );
    }

    return (
      <div className="profile-body">
        <div className="profile-bg-image" />

        <span data-letters={userFullName.charAt(0)} />
        {followButton}

        <h2 className="user-profile-fullname" style={{ marginLeft: "2%" }}>
          {headingCase(userFullName)}
        </h2>
        <span style={{ marginLeft: "2%" }}>
          @{this.props.profile ? this.props.profile.user.username : null}
        </span>
        <br />
        <p style={{ marginLeft: "2%" }} className="user-status">
          {this.props.profile ? this.props.profile.status : null}
        </p>
        <div className="user-connections">
          <span style={{ marginLeft: "2%" }} className="user-following">
            <b>
              {this.props.profile && this.props.profile.following_count
                ? this.props.profile.following_count
                : "0"}
            </b>
            &nbsp;Following
          </span>
          <span>
            <b className="user-followers">
              {this.props.profile && this.props.profile.followers_count
                ? this.props.profile.followers_count
                : "0"}
            </b>
            &nbsp;
            {this.props.profile && this.props.profile.followers_count
              ? this.props.profile.followers_count < 2
                ? "Follower"
                : "Followers"
              : "Follower"}
          </span>
        </div>
        <div className="user-tweets">
          {this.props.userTweets ? (
            <TweetsList
              tweetsList={this.props.userTweets.tweets}
              actionType={UPDATE_USER_ORIGINAL_TWEET}
              collectTweets={this.collectTweets}
            />
          ) : (
            <p>No tweets by this person yet.</p>
          )}
        </div>
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    loginStatus: state.login.loginStatus,
    profile: state.user.user,
    userTweets: state.user.userTweets
  };
};

const mapDispachToProps = {
  getUserProfile,
  getUserTweets,
  toggleFollow
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(UserProfile);
