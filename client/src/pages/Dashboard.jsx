import React, { useEffect, useState } from "react";
import { getProjects } from "../api/project.api";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  console.log(projects);

  useEffect(() => {
    loadProjects();
  }, []);
  const loadProjects = async () => {
    const response = await getProjects();
    setProjects(response.data.project);
  };

  return <div className=''>Dashboard</div>;
};

export default Dashboard;
