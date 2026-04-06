import { useEffect, useState } from "react";
import { fetchJSON } from "../hooks/fetchJSON";

const Project = () => {
  const [project, setProject] = useState([]);
  console.log(project);
  
  const [loading, setLoading] = useState(true); // Added loading state

  useEffect(() => {
    const fetchProject = async () => {
      try {
        const response = await fetchJSON("/api/project");
        console.log("Full Response:", response);
        setProject(response?.project || []);
      } catch (error) {
        console.error("Fetch error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchProject();
  }, []);

  if (loading) return <div>Loading projects...</div>;

  return (
    <div>
      {project.length > 0 ? (
        project.map((p) => <div key={p._id}>{p.name}</div>)
      ) : (
        <p>No projects found.</p>
      )}
    </div>
  );
};

export default Project;
