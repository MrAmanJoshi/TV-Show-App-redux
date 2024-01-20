import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { normalize, schema } from "normalizr";
import React from "react"; 
import { Person } from "../Models/Shows";

const initialState = {
  cast: [] as { [id: number]: {id: number, person: Person[]} }
}
type State = typeof initialState;

const loaded = (state: State, action: PayloadAction<{id: number, person: Person[]}[]>)=>{
  const castObj = action.payload;
   const castEntity = new schema.Entity("cast");
  const data = normalize(castObj, [castEntity]);
  state.cast = {...state.cast, ...data.entities.cast }
};
const castSlice = createSlice({
  name: "cast",
  initialState,
  reducers: {
   loaded
  }
  
});

const {actions, reducer: castReducer} = castSlice;

export const  {
  loaded: castLoadedAction
} = actions

export default castReducer;