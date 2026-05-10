/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import API_URL from "../api/axiosHelper";
import axios from "axios";
const Dashboard = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  // const [status, setCategory] = ;
  const [tasks, setTasks] = useState([]);
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [users, setUsers] = useState([]);
  const [teams, setTeams] = useState([]);
  const [projects, setProjects] = useState([]);
  const navigate = useNavigate();
  console.log(tasks);
  console.log(searchParams);
  console.log(users);
  console.log(teams);
  console.log(projects);

  // const filterTasks = tasks.filter((f) => f.status.includes(category));

  useEffect(() => {
    fetchTasks();
  }, [status]);

  useEffect(() => {
    const fetchFilters = async () => {
      try {
        const [teamRes, projectRes,userRes] = await Promise.all([
          API_URL.get("/auth/team"),
          API_URL.get("/api/project"),
          API_URL.get("/api/users")
        ]);
        setTeams(teamRes.data.data.team);
        setProjects(projectRes.data.project);
        setUsers(userRes.data.data.users)
      } catch (error) {
        console.error("Error fetching filters:", error);
      }
    };
    fetchFilters();
  }, []);

  const fetchTasks = async () => {
    const params = {
      status: status,
      users,
      teams,
      projects,
    };
    try {
      const res = await API_URL.get("/auth/filter/task", { params });
      setTasks(res.data.data.tasks);
      setSearchParams(params, { replace: true });
    } catch (error) {
      console.error(error.message);
    }
  };
  return (
    <div>
      <h2>Dashboard</h2>
      <select value={status} onChange={(e) => setStatus(e.target.value)}>
        <option value=''>All Status</option>
        <option value='To Do'>To Do</option>
        <option value='Completed'>Completed</option>
        <option value='Blocked'>Blocked</option>
        <option value='In Progress'>In Progress</option>
      </select>
      <section>
        {tasks.map((each) => (
          <div key={each._id}>
            <p>Name:{each.name}</p>
            <p>Status: {each.status}</p>
            <div className='border-bottom'></div>
          </div>
        ))}
      </section>
    </div>
  );
};
export default Dashboard;

