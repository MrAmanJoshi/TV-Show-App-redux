import { createSelector } from "reselect";
import { State } from "../Store";

 function stateSelector(state: State){
  return state.show
};

export const queryMapSelector = createSelector(stateSelector, (showState)=>( showState.query ));

export const loadingSelector = createSelector(stateSelector, (showState)=>(showState.loading));

export const showLoadingSelector = createSelector(stateSelector, (showState)=>{
  return showState.show_loading
})
 
export const showMapSelector = createSelector(stateSelector, (showState)=>{
  console.log("show in selector", showState.show)
  return showState.show
}
);

export const showQueryMapSelector = createSelector(stateSelector, (showState)=>(showState.show_query ))

export const showsLoadedSelector = createSelector(showMapSelector,queryMapSelector,showQueryMapSelector, (normalizedShows, query, showQueryMap)=>{
  const shows = 
showQueryMap[query] ? showQueryMap[query].map((id: number)=>(normalizedShows[id])) : [] ;
  return shows
  });