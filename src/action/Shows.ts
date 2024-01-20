import { ActionCreater } from "./main";

export const SHOWS_DETAIL_API_CALL = "shows detail api call";

export const ShowDetailApiCalled: ActionCreater<number> = (id: number)=>({
  type: SHOWS_DETAIL_API_CALL,
  payload: id
});

