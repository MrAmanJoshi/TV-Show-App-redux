import { createSelector } from "reselect"
import { State } from "../Store"

const castStateSelector = (state: State) => {
  return state.cast;
};

export const castMapSelector = createSelector(castStateSelector, (CastState) => CastState.cast);

// export const castMapSelector = createSelector(castSelector, (castObj)=>{ return Object.keys(castObj).map((k)=>(castObj[+k]));
// })
