import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Assuming you use react-router

export const useFetch = (url) => {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      // 1. Pull the actual token from localStorage
      const token = localStorage.getItem("asanaToken");

      // 2. If no token exists, redirect to signin
      if (!token) {
        navigate("/signin");
        return;
      }

      setLoading(true);
      try {
        const response = await fetch(url, {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        });

        // 3. Handle unauthorized (expired token)
        if (response.status === 401) {
          localStorage.removeItem("asanaToken"); // Clear bad token
          navigate("/signin");
          return;
        }

        if (!response.ok) throw new Error("Fetch Failed");

        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false); // Ensure loading stops regardless of success/fail
      }
    };

    if (url) fetchData();
  }, [url, navigate]);

  return { data, error, loading };
};
