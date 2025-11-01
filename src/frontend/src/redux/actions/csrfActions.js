import axios from "axios";
import Cookies from "js-cookie";

const API_BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:8000";

export default async function getCsrfToken() {
  try {
    const csrfResponse = await axios.get(`${API_BASE_URL}/csrf/`, {
      withCredentials: true
    });
    const csrfToken = csrfResponse.data.csrfToken;
    Cookies.set("csrftoken", csrfToken);
    return csrfToken;
  } catch (error) {
    console.error("CSRF token fetch error:", error);
    return null;
  }
}

export async function pingServer() {
  try {
    const response = await axios.get(`${API_BASE_URL}/ping/`, {
      withCredentials: true
    });
    return response.status === 200;
  } catch (error) {
    return false;
  }
}
