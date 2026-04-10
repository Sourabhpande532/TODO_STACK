const { default: API_URL } = require( "./axiosHelper" );

export const getTeam = ()=>{
  return API_URL.get("/auth/team")
}