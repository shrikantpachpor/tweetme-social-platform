import React from "react";
import { connect } from "react-redux";
import Tweet from "./Tweet.jsx";
import "./css/tweets.css";
import { getUserProfile } from "../../redux/actions/profileActions.js";

import {
  toggleLike,
  postTweet,
  deleteTweet,
  getData
} from "../../redux/actions/tweetsActions.js";
import {
  UPDATE_USER_ORIGINAL_TWEET,
  RETWEET_TWEET,
  DELETE_TWEET
} from "../../redux/types.js";
/*
Example tweets data structure:
{
     "parent": null,
     "owner": {
         "username": "demouser1",
         "first_name": "Demo",
         "last_name": "User1"
     },
     "content": "This is a sample tweet",
     "type": "Original",
     "created_date": "2023-10-30T12:00:00Z",
     "likes": [],
     "likes_count": 0
 }
*/
class TweetsList extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    const tweets = this.props.tweetsList
      ? this.props.tweetsList
      : this.props.tweets
      ? this.props.tweets
      : [];
    return (
      <div className="tweets-body">
        {tweets ? (
          tweets.map((tweet, index) => {
            //  return <p key={index}>This is is just a return statement</p>;
            return (
              <Tweet
                tweet={tweet}
                singleTweetPage={false}
                level={0}
                user={this.props.user}
                key={index}
                getUserProfile={this.props.getUserProfile}
                toggleLike={this.props.toggleLike}
                actionType={this.props.actionType}
                collectTweets={this.props.collectTweets}
                postTweet={this.props.postTweet}
                getData={this.props.getData}
                deleteTweet={this.props.deleteTweet}
                //  endFunction={/*this.props.endFunction*/}
              />
            );
          })
        ) : (
          <p>There are no tweets available</p>
        )}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    tweets: state.tweet.tweets,
    loginStatus: state.login.loginStatus,
    user: state.user.user
  };
};

const mapDispachToProps = {
  getUserProfile,
  toggleLike,
  postTweet,
  deleteTweet,
  getData
};

export default connect(
  mapStateToProps,
  mapDispachToProps
)(TweetsList);
