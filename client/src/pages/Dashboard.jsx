/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect, useState } from "react";
import { getProjects } from "../api/project.api";
import { useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";
import API_URL from "../api/axiosHelper";

const Dashboard = () => {
  const [projects, setProjects] = useState([]);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  console.log(searchParams);

  const status = searchParams.get("status") || "";
  console.log(status);

  const team = searchParams.get("team") || "";
  const navigate = useNavigate();
  console.log(tasks);

  useEffect(() => {
    // loadProjects();
  }, []);

  useEffect(() => {
    fetchTasks();
  }, [searchParams]);
  const loadProjects = async () => {
    const response = await getProjects();
    setProjects(response.data.project);
  };

  const fetchTasks = async () => {
    try {
      setLoading(true);
      const res = await API_URL.get("/auth/filter/task", {
        params: { status, team },
      });
      setTasks(res.data.data.tasks);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  const updateFilter = (key, value) => {
    const newParams = new URLSearchParams(searchParams);
    // console.log(newParams);

    if (value) {
      newParams.set(key, value);
    } else {
      newParams.delete(key);
    }
    // console.log(newParams);

    setSearchParams(newParams);
  };
  if (loading) return <p>Loading...</p>;
  return (
    <div className='container'>
      {/* Filters */}
      <div className='task-filters'>
        <select>
          <option>--choose option--</option>
          <option>All Status</option>
        </select>
        <br />
        <br />
        <select
          value={status}
          onChange={(e) => updateFilter("status", e.target.value)}>
          <option value=''>All Status</option>
          <option value='To Do'>To Do</option>
          <option value='Completed'>Completed</option>
          <option value='Blocked'>Blocked</option>
          <option value='In Progress'>In Progress</option>
        </select>
      </div>
    </div>
  );
};

export default Dashboard;
