import {
  GET_USER_PROFILE,
  GET_USER_ORIGINAL_TWEETS,
  UPDATE_USER_ORIGINAL_TWEET
} from "../types.js";

const userInitialState = {
  user: null,
  users: "",
  userTweets: ""
};

const userReducer = (state = userInitialState, action) => {
  switch (action.type) {
    case GET_USER_PROFILE:
      return { ...state, user: action.payload };

    case GET_USER_ORIGINAL_TWEETS:
      return { ...state, userTweets: action.payload };

    case UPDATE_USER_ORIGINAL_TWEET:
      const newTweet = action.payload;
      const userTweets = [state.userTweets];
      userTweets["tweets"] = state.userTweets.tweets.map(tweet => {
        return tweet.id === newTweet.id
          ? {
              ...tweet,
              if_liked: newTweet.if_liked,
              likes_count: newTweet.likes_count
            }
          : tweet;
      });
      return {
        ...state,
        userTweets: userTweets
      };

    default:
      return state;
  }
};

export default userReducer;