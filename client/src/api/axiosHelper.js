import axios from "axios";
const isLocalhost = window.location.hostname === "localhost";
console.log(isLocalhost);

const API_URL = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

export default API_URL;
