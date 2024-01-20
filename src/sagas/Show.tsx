import { AnyAction } from "redux";
import { call, put } from "redux-saga/effects";
import { getTvShowDetail, getTvShows } from "../Components/Api";
import {  Shows, Show_Cast } from "../Models/Shows";
import { castLoadedAction } from "../slices/Cast";
import { showDetailLoadedAction, showsLoadedAction } from "../slices/Show";

export function* getShowSaga (action: AnyAction): Generator<any, any, any>{
  
 const shows_cast: Show_Cast[] = yield call( getTvShows, action.payload );
  
  const shows = shows_cast.map((items: Show_Cast)=>(items.show));
  
  const cast = shows_cast.map((items)=>(items.cast));
  
  yield put(showsLoadedAction(shows));
  yield put(castLoadedAction(cast));
};

export function* getShowDetailSaga (action: AnyAction): Generator<any, any, any>{
  const detail: Shows =  yield call(getTvShowDetail, action.payload);
 console.log('detail in saga')
  yield put(showDetailLoadedAction(detail))}
