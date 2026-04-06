import React from "react";
import { useFetch } from "../hooks/useFetch";
import API_URL from "../api/axiosHelper";

const Report = () => {
  const { data } = useFetch('http://localhost:5001/api/project');
  // console.log(data);

  return <div>Report</div>;
};

export default Report;
