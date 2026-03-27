/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function OAuthSuccess() {
  const navigate = useNavigate();
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (token) {
      localStorage.setItem("asanaToken", token);
      navigate("/report", { replace: true });
    } else {
      navigate("/signin");
    }
  }, []);

  return <div>Logging you in...</div>;
}

export default OAuthSuccess;
