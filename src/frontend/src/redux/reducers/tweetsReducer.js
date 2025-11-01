import { GET_GENERAL_TWEETS, POST_TWEET, TOGGLE_LIKE } from "../types.js";

const tweetsInitialState = {
  tweets: null,
  tweet_post_status: 0
};

const tweetsReducer = (state = tweetsInitialState, action) => {
  switch (action.type) {
    case GET_GENERAL_TWEETS:
      return { ...state, tweets: action.payload };

    case TOGGLE_LIKE:
      const newTweet = action.payload;
      return {
        ...state,
        tweets: state.tweets.map(tweet => {
          return tweet.id === newTweet.id
            ? {
                ...tweet,
                if_liked: newTweet.if_liked,
                likes_count: newTweet.likes_count
              }
            : tweet;
        })
      };

    case POST_TWEET:
      return { tweet_post_status: action.payload };

    default:
      return state;
  }
};

export default tweetsReducer;