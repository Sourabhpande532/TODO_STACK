import axios from "axios";
const isLocalhost = window.location.hostname === "localhost";
console.log(isLocalhost);

const API_URL = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

API_URL.interceptors.request.use((req) => {
  const token = localStorage.getItem("asanaToken");
  if (token) {
    req.headers.Authorization = "Bearer " + token;
  }
  return req;
});

API_URL.interceptors.response.use(
  (res) => res,
  (error) => {
    if (
      error.response &&
      (error.response.status === 401 || error.response.status === 403)
    ) {
      // remove token
      localStorage.removeItem("asanaToken");
      // redirect to login
      window.location.href = "/signin";
    }
    return Promise.reject(error);
  },
);

export default API_URL;
