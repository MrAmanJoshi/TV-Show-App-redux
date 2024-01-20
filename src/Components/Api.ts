import axios from "axios";
import { Cast, Person, Shows } from "../Models/Shows";

export const getTvShowDetail = (id: number)=>{
  return axios.get("https://api.tvmaze.com/shows/" + id ).then((response)=>(response.data))
};

export const getTvShows = async (query: string) =>{
  
  const showRes = await axios.get("https://api.tvmaze.com/search/shows?q= " + query );
  const combineData = [];
  const shows = showRes.data.map((data: any)=>(data.show));
for(let i = 0; i < shows.length; i++){
  const show: Shows = shows[i];
  
  const castRes = await axios.get("https://api.tvmaze.com/shows/" + show.id + "/cast" );

  const cast: Person[] = castRes.data.map((data: Cast)=>(data.person));
  
  combineData.push({show, cast: {id: show.id, person: cast}})
};
  return Promise.all(combineData)
}; 
