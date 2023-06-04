import { call, put, takeLatest } from 'redux-saga/effects';
import { publicationSlice } from '.';
import publicationsAPI, {
	LODPublicationListResponse,
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
} from 'interfaces/publications';
import { removeFromLS } from 'utils/functions';

const { actions } = publicationSlice;

function* fetchChangeOfNamePublications(action:PayloadAction<{ params: any }>) {
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
		console.log(e)
		yield put(actions.getChangeOfNamePublicationsError());
	}
}
function* fetchLostDocumentPublications(action:PayloadAction<{ params: any }>) {
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
		const { externalSelect, reasonSelect,file,image, ...data } = action.payload;
		const publicationPayload: ChangeOfNamePublicationPayload = {
			...data,
			reason: reasonSelect?.value || '',
		};
		if (data.isExternal) {
			publicationPayload.externalName = externalSelect?.value || '';
		}
		const {data:response} = yield call(publicationsAPI.createCONPublication, publicationPayload);
		// upload image
		const photoFormData = new FormData()
		photoFormData.append("publishType",PUBLICATION_TYPES.CHANGE_OF_NAME)
		photoFormData.append("type","passport")
		photoFormData.append("publishId",response.id)
		let pubImage:Blob = yield fetch(image).then((res) => res.blob());
		pubImage = new File([pubImage],"image",{type:pubImage.type})
		photoFormData.append("image",pubImage)
		// end upload image

		// upload document
		const documentFormData = new FormData()
		documentFormData.append("publishType",PUBLICATION_TYPES.CHANGE_OF_NAME)
		documentFormData.append("type","document")
		documentFormData.append("publishId",response.id)
		let document:Blob = yield fetch(file).then((res) => res.blob())
		document = new File([document],"document",{type:document.type})
		documentFormData.append("image",document)
		// end upload document

		yield call(publicationsAPI.uploadDocument,photoFormData)
		yield call(publicationsAPI.uploadDocument,documentFormData)
		removeFromLS(STORAGE_KEYS.NEW_CON_PUBLICATION);
		yield put(actions.publishCONSuccess());
	} catch (e) {
		yield put(actions.publishCONError());
	}
}

function* publishLOD(action: PayloadAction<LossOfDocumentPublicationFields>) {
	try {
		const { externalSelect, stateSelect, countrySelect,file,image, ...data } =
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
		const {data:response} = yield call(publicationsAPI.createLODPublication, publicationPayload);
		// upload image
		const photoFormData = new FormData()
		photoFormData.append("publishType",PUBLICATION_TYPES.LOSS_OF_DOCUMENT)
		photoFormData.append("type","passport")
		photoFormData.append("publishId",response.id)
		let pubImage:Blob = yield fetch(image).then((res) => res.blob());
		pubImage = new File([pubImage],"image",{type:pubImage.type})
		photoFormData.append("image",pubImage)
		// end upload image

		// upload document
		const documentFormData = new FormData()
		documentFormData.append("publishType",PUBLICATION_TYPES.LOSS_OF_DOCUMENT)
		documentFormData.append("type","document")
		documentFormData.append("publishId",response.id)
		let document:Blob = yield fetch(file).then((res) => res.blob())
		document = new File([document],"document",{type:document.type})
		documentFormData.append("image",document)
		// end upload document

		yield call(publicationsAPI.uploadDocument,photoFormData)
		yield call(publicationsAPI.uploadDocument,documentFormData)
		removeFromLS(STORAGE_KEYS.NEW_LOD_PUBLICATION);
		yield put(actions.publishLODSuccess());
	} catch (e) {
		yield put(actions.publishLODError());
	}
}

function* publicationsSaga() {
	yield takeLatest(
		actions.getChangeOfNamePublications.type,
		fetchChangeOfNamePublications
	);
	yield takeLatest(actions.fetchPublisherPrices.type, fetchPublisherPrices);
	yield takeLatest(actions.publishCON.type, publishCON);
	yield takeLatest(actions.publishLOD.type, publishLOD);
	yield takeLatest(
		actions.getLostDocumentPublications.type,
		fetchLostDocumentPublications
	);
}

export default publicationsSaga;
