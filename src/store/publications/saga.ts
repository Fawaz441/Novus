import { call, put, takeLatest } from 'redux-saga/effects';
import { publicationSlice } from '.';
import publicationsAPI, {
	LODPublicationListResponse,
	ObituaryListResponse,
	PublicNoticeListResponse,
	PublicationsListAPICallResponse,
	PublisherPriceListAPICallResponse,
} from 'api/publications';
import { PUBLICATION_TYPES, STORAGE_KEYS } from 'utils/constants';
import { PayloadAction } from '@reduxjs/toolkit';
import {
	ChangeOfNamePublicationFields,
	ChangeOfNamePublicationPayload,
	LossOfDocumentPublicationFields,
	LossOfDocumentPublicationPayload,
	ObituaryFields,
	ObituaryPublicationPayload,
	PublicNoticeFields,
	PublicNoticePayload,
} from 'interfaces/publications';
import { removeFromLS } from 'utils/functions';

const { actions } = publicationSlice;

function* fetchChangeOfNamePublications(
	action: PayloadAction<{ params: any }>
) {
	try {
		const { data }: PublicationsListAPICallResponse = yield call(
			publicationsAPI.getPublications,
			PUBLICATION_TYPES.CHANGE_OF_NAME,
			action?.payload?.params
		);
		yield put(
			actions.getChangeOfNamePublicationsSuccess({
				meta: data.meta,
				publications: data.items,
			})
		);
	} catch (e) {
		console.log(e);
		yield put(actions.getChangeOfNamePublicationsError());
	}
}
function* fetchLostDocumentPublications(
	action: PayloadAction<{ params: any }>
) {
	try {
		const { data }: LODPublicationListResponse = yield call(
			publicationsAPI.getLostDocumentPublications,
			action?.payload?.params
		);
		yield put(
			actions.getLostDocumentsPublicationsSuccess({
				meta: data.meta,
				publications: data.items,
			})
		);
	} catch (e) {
		yield put(actions.getLostDocumentsPublicationsError());
	}
}

function* fetchObituaryPublications(action: PayloadAction<{ params: any }>) {
	try {
		const { data }: ObituaryListResponse = yield call(
			publicationsAPI.getObituaryPublications,
			action?.payload?.params
		);
		yield put(
			actions.getObituaryPublicationsSuccess({
				meta: data.meta,
				publications: data.items,
			})
		);
	} catch (e) {
		yield put(actions.getObituaryPublicationsError());
	}
}

function* fetchPublicNoticePublications(action:PayloadAction<{params:any}>){
	try {
		const { data }: PublicNoticeListResponse = yield call(
			publicationsAPI.getPublicNoticePublications,
			action?.payload?.params
		);
		yield put(
			actions.getPublicNoticePublicationsSuccess({
				meta: data.meta,
				publications: data.items,
			})
		);
	} catch (e) {
		yield put(actions.getPublicNoticePublicationsError());
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
		const { externalSelect, reasonSelect, file, image, ...data } =
			action.payload;
		const publicationPayload: ChangeOfNamePublicationPayload = {
			...data,
			reason: reasonSelect?.value || '',
		};
		if (data.isExternal) {
			publicationPayload.externalName = externalSelect?.value || '';
		}
		const { data: response } = yield call(
			publicationsAPI.createCONPublication,
			publicationPayload
		);
		// upload image
		const photoFormData = new FormData();
		photoFormData.append('publishType', PUBLICATION_TYPES.CHANGE_OF_NAME);
		photoFormData.append('type', 'passport');
		photoFormData.append('publishId', response.id);
		let pubImage: Blob = yield fetch(image).then((res) => res.blob());
		pubImage = new File([pubImage], 'image', { type: pubImage.type });
		photoFormData.append('image', pubImage);
		// end upload image

		// upload document
		const documentFormData = new FormData();
		documentFormData.append('publishType', PUBLICATION_TYPES.CHANGE_OF_NAME);
		documentFormData.append('type', 'document');
		documentFormData.append('publishId', response.id);
		let document: Blob = yield fetch(file).then((res) => res.blob());
		document = new File([document], 'document', { type: document.type });
		documentFormData.append('image', document);
		// end upload document

		yield call(publicationsAPI.uploadDocument, photoFormData);
		yield call(publicationsAPI.uploadDocument, documentFormData);
		removeFromLS(STORAGE_KEYS.NEW_CON_PUBLICATION);
		yield put(actions.publishCONSuccess());
		window.location.href = response.paymentUrl;
	} catch (e) {
		yield put(actions.publishCONError());
	}
}

function* publishLOD(action: PayloadAction<LossOfDocumentPublicationFields>) {
	try {
		const { externalSelect, stateSelect, countrySelect, file, image, ...data } =
			action.payload;
		const publicationPayload: LossOfDocumentPublicationPayload = {
			...data,
			state: stateSelect?.value || '',
			country: countrySelect?.value || '',
		};
		if (data.isExternal) {
			publicationPayload.externalName = externalSelect?.value || '';
			publicationPayload.externalPageInfo = externalSelect?.label || '';
		}
		const { data: response } = yield call(
			publicationsAPI.createLODPublication,
			publicationPayload
		);
		// upload image
		const photoFormData = new FormData();
		photoFormData.append('publishType', PUBLICATION_TYPES.LOSS_OF_DOCUMENT);
		photoFormData.append('type', 'passport');
		photoFormData.append('publishId', response.id);
		let pubImage: Blob = yield fetch(image).then((res) => res.blob());
		pubImage = new File([pubImage], 'image', { type: pubImage.type });
		photoFormData.append('image', pubImage);
		// end upload image

		// upload document
		const documentFormData = new FormData();
		documentFormData.append('publishType', PUBLICATION_TYPES.LOSS_OF_DOCUMENT);
		documentFormData.append('type', 'document');
		documentFormData.append('publishId', response.id);
		let document: Blob = yield fetch(file).then((res) => res.blob());
		document = new File([document], 'document', { type: document.type });
		documentFormData.append('image', document);
		// end upload document

		yield call(publicationsAPI.uploadDocument, photoFormData);
		yield call(publicationsAPI.uploadDocument, documentFormData);
		removeFromLS(STORAGE_KEYS.NEW_LOD_PUBLICATION);
		yield put(actions.publishLODSuccess());
		window.location.href = response.paymentUrl;
	} catch (e) {
		yield put(actions.publishLODError());
	}
}

function* publishObituary(action: PayloadAction<ObituaryFields>) {
	try {
		const { externalSelect, file, image, ...data } = action.payload;
		const obituaryPayload: ObituaryPublicationPayload = {
			...data,
		};
		if (data.isExternal) {
			obituaryPayload.externalName = externalSelect?.value || '';
		}
		const { data: response } = yield call(
			publicationsAPI.createObituaryPublication,
			obituaryPayload
		);
		// upload image
		const photoFormData = new FormData();
		photoFormData.append('publishType', PUBLICATION_TYPES.OBITUARY);
		photoFormData.append('type', 'passport');
		photoFormData.append('publishId', response.id);
		let pubImage: Blob = yield fetch(image).then((res) => res.blob());
		pubImage = new File([pubImage], 'image', { type: pubImage.type });
		photoFormData.append('image', pubImage);
		// end upload image

		// upload document
		const documentFormData = new FormData();
		documentFormData.append('publishType', PUBLICATION_TYPES.OBITUARY);
		documentFormData.append('type', 'document');
		documentFormData.append('publishId', response.id);
		let document: Blob = yield fetch(file).then((res) => res.blob());
		document = new File([document], 'document', { type: document.type });
		documentFormData.append('image', document);
		// end upload document

		yield call(publicationsAPI.uploadDocument, photoFormData);
		yield call(publicationsAPI.uploadDocument, documentFormData);
		removeFromLS(STORAGE_KEYS.NEW_OBITUARY_PUBLICATION);
		yield put(actions.publishObituarySuccess());
		window.location.href = response.paymentUrl;
	} catch (e) {
		yield put(actions.publishObituaryError());
	}
}

function* publishPublicNotice(action: PayloadAction<PublicNoticeFields>) {
	try {
		const { externalSelect, file, ...data } = action.payload;
		const publicNoticePayload: PublicNoticePayload = {
			...data,
		};
		if (data.isExternal) {
			publicNoticePayload.externalName = externalSelect?.value || '';
		}
		const { data: response } = yield call(
			publicationsAPI.createPublicNoticePublication,
			publicNoticePayload
		);
		if (file) {
			// upload document
			const documentFormData = new FormData();
			documentFormData.append('publishType', PUBLICATION_TYPES.OBITUARY);
			documentFormData.append('type', 'document');
			documentFormData.append('publishId', response.id);
			let document: Blob = yield fetch(file).then((res) => res.blob());
			document = new File([document], 'document', { type: document.type });
			documentFormData.append('image', document);
			// end upload document
			yield call(publicationsAPI.uploadDocument, documentFormData);
		}
		removeFromLS(STORAGE_KEYS.NEW_PUBLIC_NOTICE_PUBLICATION);
		yield put(actions.publishPublicNoticeSuccess());
		window.location.href = response.paymentUrl;
	} catch (e) {
		yield put(actions.publishPublicNoticeError());
	}
}

function* publicationsSaga() {
	yield takeLatest(
		actions.getChangeOfNamePublications.type,
		fetchChangeOfNamePublications
	);
	yield takeLatest(actions.fetchPublisherPrices.type, fetchPublisherPrices);
	yield takeLatest(
		actions.getLostDocumentPublications.type,
		fetchLostDocumentPublications
	);
	yield takeLatest(
		actions.getObituaryPublications.type,
		fetchObituaryPublications
	);
	yield takeLatest(
		actions.getPublicNoticePublications.type,
		fetchPublicNoticePublications
	);
	yield takeLatest(actions.publishCON.type, publishCON);
	yield takeLatest(actions.publishLOD.type, publishLOD);
	yield takeLatest(actions.publishObituary.type, publishObituary);
	yield takeLatest(actions.publishPublicNotice.type, publishPublicNotice);
}

export default publicationsSaga;
