import { all } from 'redux-saga/effects';
import publicationsSaga from './publications/saga';

export default function* rootSaga() {
	yield all([publicationsSaga()]);
}
