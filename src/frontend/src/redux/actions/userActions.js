import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function getUserTweets(username, actionType, res = null) {
  return async dispatch => {
    const url = `${API_BASE_URL}/api/tweets/user/${username}/`;
    
    return await axios
      .get(url, { 
        method: "GET", 
        credentials: "include", 
        withCredentials: true 
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(loadUserData(actionType, data.data));
          return data.data;
        } else {
          if (res) res.status(404);
          return;
        }
      });
  };
}

export function getUserLikedTweets(username, actionType, res = null) {
  return async dispatch => {
    const url = `${API_BASE_URL}/api/tweets/user/${username}/liked/`;
    
    return await axios
      .get(url, { 
        method: "GET", 
        credentials: "include", 
        withCredentials: true 
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(loadUserData(actionType, data.data));
          return data.data;
        } else {
          if (res) res.status(404);
          return;
        }
      });
  };
}

export function getUserMediaTweets(username, actionType, res = null) {
  return async dispatch => {
    const url = `${API_BASE_URL}/api/tweets/user/${username}/media/`;
    
    return await axios
      .get(url, { 
        method: "GET", 
        credentials: "include", 
        withCredentials: true 
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(loadUserData(actionType, data.data));
          return data.data;
        } else {
          if (res) res.status(404);
          return;
        }
      });
  };
}

export function loadUserData(actionType, payload) {
  return {
    type: actionType,
    payload: payload
  };
}
