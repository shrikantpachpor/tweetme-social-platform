import React, { PropTypes } from "react";
import { getData } from "../../redux/actions/tweetsActions.js";
import { connect } from "react-redux";
import serialize from "serialize-javascript";
import { Link } from "react-router-dom";
import store from "../../redux/store.js";
import { GET_GENERAL_TWEETS, TOGGLE_LIKE } from "../../redux/types.js";
import Login from "./Login.jsx";
import { parse, stringify } from "flatted";
import TweetsList from "./TweetsList.jsx";
import TweetFormWrapper from "./TweetFormWrapper.jsx";
import "./css/homepage.css";
import Cookies from "js-cookie";

class Tweet extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isAuthenticated: 0,
      updateComponent: 0
    };
    this.handleTweets = this.handleTweets.bind(this);
    this.collectTweets = this.collectTweets.bind(this);
  }
  collectTweets() {
    this.setState({ updateComponent: !this.state.updateComponent });
  }
  handleTweets() {
    this.props.getData(GET_GENERAL_TWEETS, "http://localhost:8000/api/tweets/");
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    let isAuthenticated;
    isAuthenticated = 0; // Default to not authenticated
    const uiaValue = Cookies.get("uia");
    if (uiaValue && uiaValue == 1) {
      isAuthenticated = 1;
    }
    if (prevState.isAuthenticated !== isAuthenticated) {
      return { isAuthenticated: isAuthenticated };
    } else {
      if (!nextProps.tweets) {
        return { updateComponent: !prevState.updateComponent };
      }
      return false;
    }
  }
  componentDidUpdate(prevProps, prevState) {
    if (prevState.updateComponent !== this.state.updateComponent) {
      this.handleTweets();
    }
  }
  componentDidMount() {
    if (this.state.isAuthenticated) {
      this.handleTweets();
    }
  }
  render() {
    let renderBody;

    if (this.state.isAuthenticated) {
      if (this.props.tweets) {
        renderBody = (
          <React.Fragment>
            <TweetFormWrapper />
            <TweetsList
              tweetsList={this.props.tweets}
              actionType={TOGGLE_LIKE}
              //  endFunction={this.props.getData}
              //  functionArgs={''}
            />
          </React.Fragment>
        );
      } /*else {
        renderBody = <p>waiting tweets to load..</p>;
      }*/
    } else {
      renderBody = (
        <div>
          <p>"You are not logged in. Please login to read tweets."</p>
          login here:
          <br />
          <Login />
        </div>
      );
    }

    return <div className="body">{renderBody}</div>;
  }
}

const mapStateToProps = state => {
  return {
    tweets: state.tweet.tweets
  };
};

const mapDispachToProps = {
  getData
};

const loadStoreData = store => {
  return store.dispatch(
    getData(
      FETCH_DESTINATION_DATA,
      "http://localhost:8000/apis/destinations/1/"
    )
  );
};

/*export default {
  loadStoreData,
  component: connect(
    mapStateToProps,
    mapDispachToProps
  )(Tweet)
};*/

export default connect(
  mapStateToProps,
  mapDispachToProps
)(Tweet);
