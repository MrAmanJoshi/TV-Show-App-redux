import { createEntityAdapter, createSlice, PayloadAction  } from '@reduxjs/toolkit';
import {  Shows } from '../Models/Shows';

const showAdapter = createEntityAdapter<Shows>();

const initialState= showAdapter.getInitialState(
  {
  query: "",
  show_query: {} as { [query: string]: number[] },
  loading: false, 
  show_loading: false,
    detail: {} as Shows
}
);

type State = typeof initialState;
 
const queryChange = (state: State, action: PayloadAction<string>)=>{
  state.query = action.payload;
        state.loading = true;
   };

const showsLoaded = (state: State, action: PayloadAction<Shows[]>)=>{
    
   const show: Shows[] = action.payload;
    
  state.show_query[state.query] = show.map((s)=>(s.id));
  state.loading = false;
  showAdapter.addMany(state, action);
};

const showLoading = (state: State)=>{ 
  state.show_loading = true
};

// const Detail = (state: State, action: PayloadAction<Shows>)=>{
//   state.show_loading = false;
//     showAdapter.addOne(state, action)
//    // state.detail = show
// }
export const showDetailLoadedAction = "show/loaded"
const showSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    showsLoaded,
    queryChange,
    showLoading,
    // Detail
  },
});
const {actions, reducer: showsReducer} = showSlice
export const { 
  showsLoaded: showsLoadedAction, queryChange: queryChangeAction, showLoading: showLoadingAction,
// Detail: showDetailLoadedAction,
} = actions;

export default showsReducer