import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export function loginUser(values) {
  return async dispatch => {
    try {
      const csrfResponse = await axios.get(`${API_BASE_URL}/csrf/`, {
        withCredentials: true
      });
      const csrfToken = csrfResponse.data.csrfToken;

      const headers = {
        Accept: "application/json",
        "Content-Type": "application/json"
      };

      if (csrfToken) {
        headers["X-CSRFToken"] = csrfToken;
      }

      const response = await axios.post(`${API_BASE_URL}/rest-auth/login/`, {
        email: values.email,
        password: values.password
      }, {
        withCredentials: true,
        headers: headers
      });

      if (response.status === 200) {
        const authToken = response.data.key;
        
        if (authToken) {
          Cookies.set('auth_token', authToken, { 
            expires: 7, 
            secure: false,
            sameSite: 'lax' 
          });
          Cookies.set('uia', '1', { 
            expires: 7, 
            secure: false,
            sameSite: 'lax' 
          });
          
          return 1;
        } else {
          return 0;
        }
      } else {
        return 0;
      }
    } catch (error) {
      return 0;
    }
  };
}

export function checkLoginStatus() {
  const authToken = Cookies.get('auth_token');
  const uia = Cookies.get('uia');
  return !!(authToken && uia);
}
