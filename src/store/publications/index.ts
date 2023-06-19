import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	ChangeOfNamePublicationFields,
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationFields,
	LossOfDocumentPublicationValues,
	ObituaryFields,
	ObituaryValues,
	PublicNoticeFields,
	PublicNoticeValues,
	PublicationsListMeta,
	PublicationsState,
	PublisherPrice,
} from 'interfaces/publications';
import { PUBLICATION_TYPES } from 'utils/constants';

const initialState: PublicationsState = {
	// list loaders
	loadingCONPublications: true,
	loadingLODPublications: true,
	loadingObituaryPublications: true,
	loadingPublicNoticePublications: false,
	// loading publisher prices
	loadingPublisherPrices: false,
	// publishing loaders
	publishingCON: false,
	publishingLOD: false,
	publishingObituary: false,
	publishingPublicNotice: false,
	// data
	// publication lists
	LODPublications: [],
	obituaryPublications: [],
	CONPublications: [],
	publicNoticePublications: [],
	// new
	newCONPublication: null,
	newLODPublication: null,
	newObituaryPublication: null,
	newPublicNoticePublication: null,
	// meta
	CONPublicationsMeta: null,
	LODPublicationsMeta: null,
	obituaryPublicationsMeta: null,
	publicNoticePublicationsMeta: null,
	// publisher prices
	publisherPrices: [],
	// success
	publishCONSuccess: false,
	publishLODSuccess: false,
	publishObituarySuccess: false,
	publishPublicNoticeSuccess: false,
	// error
	LODPublicationsError: false,
	CONPublicationsError: false,
	publisherPricesError: false,
	obituaryPublicationsError: false,
	publicNoticePublicationsError: false,
	// publish error
	publishCONError: false,
	publishLODError: false,
	publishObituaryError: false,
	publishPublicNoticeError: false,
};

const clearTempPublications = (state: PublicationsState) => {
	state.newCONPublication = null;
	state.newLODPublication = null;
	state.newObituaryPublication = null;
	state.newPublicNoticePublication = null;
};

export const publicationSlice = createSlice({
	name: 'publications',
	initialState,
	reducers: {
		// publisher prices
		fetchPublisherPrices: (
			state,
			action: PayloadAction<{ publicationType: PUBLICATION_TYPES }>
		) => {
			state.loadingPublisherPrices = true;
			state.publisherPricesError = false;
		},
		fetchPublisherPricesError: (state) => {
			state.publisherPricesError = true;
			state.publisherPrices = [];
			state.loadingPublisherPrices = false;
		},
		fetchPublisherPricesSuccess: (
			state,
			action: PayloadAction<PublisherPrice[]>
		) => {
			state.publisherPrices = action.payload;
			state.loadingPublisherPrices = false;
		},
		clearPublisherPrices: (state) => {
			state.publisherPrices = [];
		},
		// end publisher prices
		addNewConPublication: (
			state,
			action: PayloadAction<ChangeOfNamePublicationFields>
		) => {
			state.newCONPublication = action.payload;
		},
		clearNewConPublication: (state) => {
			state.newCONPublication = null;
		},
		addNewLodPublication: (
			state,
			action: PayloadAction<LossOfDocumentPublicationFields>
		) => {
			state.newLODPublication = action.payload;
		},
		clearNewLodPublication: (state) => {
			state.newLODPublication = null;
		},
		addNewPublicNoticePublication: (
			state,
			action: PayloadAction<PublicNoticeFields>
		) => {
			state.newPublicNoticePublication = action.payload;
		},
		clearNewPublicNoticePublication: (state) => {
			state.newPublicNoticePublication = null;
		},
		addNewObituaryPublication: (
			state,
			action: PayloadAction<ObituaryFields>
		) => {
			state.newObituaryPublication = action.payload;
		},
		clearNewObituaryPublication: (state) => {
			state.newObituaryPublication = null;
		},
		// change of name publications
		getChangeOfNamePublications: (state, action?: PayloadAction<any>) => {
			state.loadingCONPublications = true;
			state.CONPublicationsError = false;
		},
		getChangeOfNamePublicationsSuccess: (
			state,
			action: PayloadAction<{
				meta: PublicationsListMeta;
				publications: ChangeOfNamePublicationValues[];
			}>
		) => {
			state.loadingCONPublications = false;
			state.CONPublications = action.payload.publications;
			state.CONPublicationsMeta = action.payload.meta;
		},
		getChangeOfNamePublicationsError: (state) => {
			// state.CONPublications = [];
			state.CONPublicationsError = true;
			state.loadingCONPublications = false;
		},
		// end change of name publications

		// lost document publications
		getLostDocumentPublications: (state, action?: PayloadAction<any>) => {
			state.loadingLODPublications = true;
			state.LODPublicationsError = false;
		},
		getLostDocumentsPublicationsSuccess: (
			state,
			action: PayloadAction<{
				meta: PublicationsListMeta;
				publications: LossOfDocumentPublicationValues[];
			}>
		) => {
			state.loadingLODPublications = false;
			state.LODPublications = action.payload.publications;
			state.LODPublicationsMeta = action.payload.meta;
		},
		getLostDocumentsPublicationsError: (state) => {
			// state.CONPublications = [];
			state.LODPublicationsError = true;
			state.loadingLODPublications = false;
		},
		// end lost document publications

		// obituary publications
		getObituaryPublications: (state, action?: PayloadAction<any>) => {
			state.loadingObituaryPublications = true;
			state.obituaryPublicationsError = false;
		},
		getObituaryPublicationsSuccess: (
			state,
			action: PayloadAction<{
				meta: PublicationsListMeta;
				publications: ObituaryValues[];
			}>
		) => {
			state.obituaryPublications = action.payload.publications;
			state.loadingObituaryPublications = false;
			state.obituaryPublicationsMeta = action.payload.meta;
		},
		getObituaryPublicationsError: (state) => {
			state.obituaryPublicationsError = true;
			state.loadingObituaryPublications = false;
		},

		// public notice publications
		getPublicNoticePublications: (state, action?: PayloadAction<any>) => {
			state.loadingPublicNoticePublications = true;
			state.publicNoticePublicationsError = false;
		},
		getPublicNoticePublicationsSuccess: (
			state,
			action: PayloadAction<{
				meta: PublicationsListMeta;
				publications: PublicNoticeValues[];
			}>
		) => {
			state.publicNoticePublications = action.payload.publications;
			state.loadingPublicNoticePublications = false;
			state.publicNoticePublicationsMeta = action.payload.meta;
		},
		getPublicNoticePublicationsError: (state) => {
			state.loadingPublicNoticePublications = false;
			state.publicNoticePublicationsError = true;
		},

		// publishing CON
		publishCON: (state, action) => {
			state.publishingCON = true;
			state.publishCONError = false;
		},
		publishCONSuccess: (state) => {
			state.publishingCON = false;
			clearTempPublications(state);
			state.publishCONSuccess = true;
		},
		publishCONError: (state) => {
			state.publishCONError = true;
			state.publishingCON = false;
		},
		// publishing LOD
		publishLOD: (state, action) => {
			state.publishingLOD = true;
			state.publishLODError = false;
		},
		publishLODSuccess: (state) => {
			state.publishingLOD = false;
			clearTempPublications(state);
			state.publishLODSuccess = true;
		},
		publishLODError: (state) => {
			state.publishLODError = true;
			state.publishingLOD = false;
		},
		// publishing Obituary
		publishObituary: (state, action) => {
			state.publishingObituary = true;
			state.publishObituaryError = false;
		},
		publishObituarySuccess: (state) => {
			state.publishingObituary = false;
			clearTempPublications(state);
			state.publishObituarySuccess = true;
		},
		publishObituaryError: (state) => {
			state.publishObituaryError = true;
			state.publishingObituary = false;
		},
		// publishing public notice
		publishPublicNotice: (state, action) => {
			state.publishingPublicNotice = true;
			state.publishPublicNoticeError = false;
		},
		publishPublicNoticeSuccess: (state) => {
			state.publishingPublicNotice = false;
			clearTempPublications(state);
			state.publishPublicNoticeSuccess = true;
		},
		publishPublicNoticeError: (state) => {
			state.publishPublicNoticeError = true;
			state.publishingPublicNotice = false;
		},
		// reset success states
		resetPublishSuccess(state) {
			state.publishCONSuccess = false;
			state.publishLODSuccess = false;
			state.publishObituarySuccess = false;
			state.publishPublicNoticeSuccess = false;
		},
		resetPublishError(state){
			state.publishCONError = false;
			state.publishLODError = false;
			state.publishObituaryError = false;
			state.publishPublicNoticeError = false;
		}
	},
});

export const {
	addNewConPublication,
	clearNewConPublication,
	addNewLodPublication,
	clearNewLodPublication,
	addNewObituaryPublication,
	clearNewObituaryPublication,
	addNewPublicNoticePublication,
	clearNewPublicNoticePublication,
} = publicationSlice.actions;

export default publicationSlice.reducer;
