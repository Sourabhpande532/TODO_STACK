import axios from "axios";
export const authServerAxios = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL,
  withCredentials: true,
});

export const githubApiAxios = axios.create({
  baseURL: process.env.REACT_GITHUB_API_BASE_URL,
});

export const googleApiAxios = axios.create({
  baseURL: `https://www.googleapis.com/oauth2/v2`,
});
