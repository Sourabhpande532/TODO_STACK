import { useEffect } from "react";
import { getTeam } from "../api/team.api";
import { useState } from "react";
import { useFetch } from "../hooks/useFetch";
import API_URL from "../api/axiosHelper";
import { API } from "../api/helper.api";

const Team = () => {
  const {data} = useFetch(`${API}/auth/team`)  
  const [team, setTeam] = useState([]);
  console.log(data);

  useEffect(() => {
    // loadTeam();
  }, []);

//   const loadTeam = async () => {
//     const response = await getTeam();
//     setTeam(response.data.data.team);
//   };
  return (
    <div className='py-3'>
      <h2>Teams</h2>
    </div>
  );
};
export { Team };
