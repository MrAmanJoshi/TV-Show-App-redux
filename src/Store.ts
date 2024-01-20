import { configureStore } from "@reduxjs/toolkit";
import { rootSaga, sagaMiddleWare } from "./sagas";
import castReducer from "./slices/Cast";
import showsReducer from "./slices/Show";

export type State = ReturnType<typeof store.getState>

const store = configureStore({
  reducer: {
    show: showsReducer,
    cast: castReducer
  },
  middleware: [sagaMiddleWare]
})
sagaMiddleWare.run(rootSaga)
export default store;