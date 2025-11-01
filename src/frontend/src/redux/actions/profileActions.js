import axios from "axios";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function getUserProfile(username, res = null) {
  return async dispatch => {
    const url = `${API_BASE_URL}/api/tweets/user/${username}/profile/`;
    
    return await axios
      .get(url, { 
        method: "GET", 
        credentials: "include", 
        withCredentials: true 
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(loadProfileData("PROFILE_DATA", data.data));
          return data.data;
        } else {
          if (res) res.status(404);
          return;
        }
      });
  };
}

export function getFollowersModal(username, res = null) {
  return async dispatch => {
    const url = `${API_BASE_URL}/api/tweets/user/${username}/followers/`;
    
    return await axios
      .get(url, { 
        method: "GET", 
        credentials: "include", 
        withCredentials: true 
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(loadProfileData("FOLLOWERS_MODAL", data.data));
          return data.data;
        } else {
          if (res) res.status(404);
          return;
        }
      });
  };
}

export function getFollowingModal(username, res = null) {
  return async dispatch => {
    const url = `${API_BASE_URL}/api/tweets/user/${username}/following/`;
    
    return await axios
      .get(url, { 
        method: "GET", 
        credentials: "include", 
        withCredentials: true 
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(loadProfileData("FOLLOWING_MODAL", data.data));
          return data.data;
        } else {
          if (res) res.status(404);
          return;
        }
      });
  };
}

export function toggleFollow(username, res = null) {
  return async dispatch => {
    const url = `${API_BASE_URL}/api/tweets/user/${username}/follow/`;
    
    return await axios
      .get(url, { 
        method: "GET", 
        credentials: "include", 
        withCredentials: true 
      })
      .then(data => {
        if (data.status === 200) {
          dispatch(loadProfileData("TOGGLE_FOLLOW", data.data));
          return data.data;
        } else {
          if (res) res.status(404);
          return;
        }
      });
  };
}

export function loadProfileData(actionType, payload) {
  return {
    type: actionType,
    payload: payload
  };
}
