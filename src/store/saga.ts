import { all } from 'redux-saga/effects';
import publicationsSaga from './publications/saga';
import adminSaga from './admin/saga';

export default function* rootSaga() {
	yield all([publicationsSaga(), adminSaga()]);
}
