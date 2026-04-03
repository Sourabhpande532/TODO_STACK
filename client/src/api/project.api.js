import API_URL from "./axiosHelper";
export const getProjects = () => {
  return API_URL.get("/api/project");
};
