import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function postTweet(values, type, actionType = null) {
  return dispatch => {
    let data;
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };
    let session_url;
    let userId;
    
    if (type === "Original") {
      session_url = `${API_BASE_URL}/api/tweets/`;
      data = {
        tweet: values.tweet,
        type: "Original"
      };
    } else if (type === "Retweet") {
      session_url = `${API_BASE_URL}/api/tweets/retweet/`;
      data = { parent: values, type: "Retweet" };
    } else if (type === "Reply") {
      userId = values.tweetParentId;
      session_url = `${API_BASE_URL}/api/tweets/${userId}/reply/`;
      data = {
        tweet: values.tweet
      };
    } else {
      return;
    }

    const csrfToken = Cookies.get("csrftoken");
    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    }

    const authToken = Cookies.get("auth_token");
    if (authToken) {
      headers["Authorization"] = `Token ${authToken}`;
    }

    return axios
      .post(session_url, data, {
        withCredentials: true,
        headers: headers
      })
      .then(response => {
        if (response.status === 201) {
          return 1;
        } else {
          return 0;
        }
      })
      .catch(error => {
        return 0;
      });
  };
}

export function getData(actionType, url, res = null) {
  return async dispatch => {
    try {
      const response = await axios.get(url);
      if (response.status === 200) {
        dispatch(loadData(actionType, response.data));
        return response.data;
      } else {
        if (res) res.status(404);
        return;
      }
    } catch (error) {
      console.error('API call failed:', error);
      if (res) res.status(500);
      return;
    }
  };
}

export function toggleLike(actionType, tweetId, res = null) {
  return async dispatch => {
    const url = `${API_BASE_URL}/api/tweets/${tweetId}/like/`;
    
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    const csrfToken = Cookies.get("csrftoken");
    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    }

    const authToken = Cookies.get("auth_token");
    if (authToken) {
      headers["Authorization"] = `Token ${authToken}`;
    }
    
    return await axios
      .get(url, { 
        withCredentials: true,
        headers: headers
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(loadData(actionType, data.data));
          return data.data;
        } else {
          if (res) res.status(404);
          return;
        }
      })
      .catch(error => {
        return;
      });
  };
}

export function deleteTweet(actionType, tweetId, res = null) {
  return async dispatch => {
    const url = `${API_BASE_URL}/api/tweets/${tweetId}/delete-tweet/`;
    
    const headers = {
      Accept: "application/json",
      "Content-Type": "application/json"
    };

    const csrfToken = Cookies.get("csrftoken");
    if (csrfToken) {
      headers["X-CSRFToken"] = csrfToken;
    }

    const authToken = Cookies.get("auth_token");
    if (authToken) {
      headers["Authorization"] = `Token ${authToken}`;
    }
    
    return await axios
      .get(url, { 
        withCredentials: true,
        headers: headers
      })
      .then(data => {
        if (data.status === 200) {
          return 1; // Success
        } else {
          if (res) res.status(404);
          return 0; // Failed
        }
      })
      .catch(error => {
        return 0; // Failed
      });
  };
}

export function loadData(actionType, payload) {
  return {
    type: actionType,
    payload: payload
  };
}