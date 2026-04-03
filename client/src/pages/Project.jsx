import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { getProjects } from "../api/project.api";
import { useEffect } from "react";

const Project = () => {
  const [projects, setProjects] = useState([]);
  console.log(projects);

  const navigate = useNavigate();
  useEffect(() => {
    loadProjects();
  }, []);
  const loadProjects = async () => {
    const res = await getProjects();
    setProjects(res.data.project);
  };
  return <div>Project</div>;
};

export default Project;
