import { call, put, takeLatest } from 'redux-saga/effects';
import { publicationSlice } from '.';
import publicationsAPI, {
	PublicationsListAPICallResponse,
	PublisherPriceListAPICallResponse,
} from 'api/publications';
import { PUBLICATION_TYPES } from 'utils/constants';
import { PayloadAction } from '@reduxjs/toolkit';
import {
	ChangeOfNamePublicationFields,
	ChangeOfNamePublicationPayload,
} from 'interfaces/publications';

const { actions } = publicationSlice;

function* fetchChangeOfNamePublications() {
	try {
		const { data }: PublicationsListAPICallResponse = yield call(
			publicationsAPI.getPublications,
			PUBLICATION_TYPES.CHANGE_OF_NAME
		);
		yield put(
			actions.getChangeOfNamePublicationsSuccess({
				meta: data.meta,
				publications: data.items,
			})
		);
	} catch (e) {
		yield put(actions.getChangeOfNamePublicationsError());
	}
}

function* fetchPublisherPrices(
	action: PayloadAction<{ publicationType: PUBLICATION_TYPES }>
) {
	try {
		const { data }: PublisherPriceListAPICallResponse = yield call(
			publicationsAPI.getPublisherPrices,
			action.payload.publicationType
		);
		yield put(actions.fetchPublisherPricesSuccess(data));
	} catch (e) {
		yield put(actions.fetchPublisherPricesError());
	}
}

function* publishCON(action: PayloadAction<ChangeOfNamePublicationFields>) {
	try {
		const { externalSelect, reasonSelect, ...data } = action.payload;
		const publicationPayload: ChangeOfNamePublicationPayload = {
			...data,
			reason: reasonSelect?.value || '',
		};
		if (!data.isExternal) {
			delete publicationPayload.externalName;
		}
		yield call(publicationsAPI.createCONPublication, publicationPayload);
		yield put(actions.publishCONSuccess());
	} catch (e) {
		yield put(actions.publishCONError());
	}
}

function* publicationsSaga() {
	yield takeLatest(
		actions.getChangeOfNamePublications.type,
		fetchChangeOfNamePublications
	);
	yield takeLatest(actions.fetchPublisherPrices.type, fetchPublisherPrices);
	yield takeLatest(actions.publishCON.type, publishCON);
}

export default publicationsSaga;
