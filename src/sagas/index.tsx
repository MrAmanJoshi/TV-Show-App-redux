import createSagaMiddleware from 'redux-saga'
import { debounce, takeEvery } from 'redux-saga/effects';
import { SHOWS_DETAIL_API_CALL } from '../action/Shows';
import { queryChangeAction } from '../slices/Show';
import { getShowDetailSaga, getShowSaga } from './Show';

export const sagaMiddleWare = createSagaMiddleware();

export function* rootSaga() {
  yield debounce(250, queryChangeAction, getShowSaga);
  yield takeEvery(SHOWS_DETAIL_API_CALL, getShowDetailSaga);
};