import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { normalize, schema } from 'normalizr';
import { Shows } from '../Models/Shows';

const initialState = {
  show: {} as { [id: number]: Shows },
  query: "",
  show_query: {} as { [query: string]: number[] },
  loading: false,
  show_loading: false
};
type State = typeof initialState;
const queryChange = (state: State, action: PayloadAction<string>) => {
  state.query = action.payload;
  state.loading = true;
};

const showsLoaded = (state: State, action: PayloadAction<Shows[]>) => {
  const show: Shows[] = action.payload;
  state.show_query[state.query] = show.map((s) => (s.id));
  const showEntity = new schema.Entity("show");
  const data = normalize(show, [showEntity]);
  state.show = { ...state.show, ...data.entities.show };
  state.loading = false;
};
const showLoading = (state: State) => {
  state.show_loading = true
};

const Detail = (state: State, action: PayloadAction<Shows>) => {
  state.show_loading = false;
  state.show[action.payload.id] = action.payload;
}

const showSlice = createSlice({
  name: 'shows',
  initialState,
  reducers: {
    showsLoaded,
    queryChange,
    showLoading,
    Detail
  },
});
const { actions, reducer: showsReducer } = showSlice
export const {
  showsLoaded: showsLoadedAction, queryChange: queryChangeAction, showLoading: showLoadingAction,
  Detail: showDetailLoadedAction
} = actions;

export default showsReducer