import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	ChangeOfNamePublicationFields,
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationFields,
	PublicationsListMeta,
	PublicationsState,
	PublisherPrice,
} from 'interfaces/publications';
import { PUBLICATION_TYPES } from 'utils/constants';

const initialState: PublicationsState = {
	loadingCONPublications: true,
	loadingLODPublications: true,
	loadingPublisherPrices: false,
	newCONPublication: null,
	newLODPublication: null,
	CONPublications: [],
	CONPublicationsError: false,
	CONPublicationsMeta: null,
	publisherPrices: [],
	publisherPricesError: false,
	publishingCON: false,
	publishCONError: false,
	publishCONSuccess: false,
	publishingLOD: false,
	publishLODError: false,
	publishLODSuccess: false,
};

export const publicationSlice = createSlice({
	name: 'counter',
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
		// change of name publications
		getChangeOfNamePublications: (state) => {
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
			state.CONPublications = [
				...state.CONPublications,
				...action.payload.publications,
			];
			state.CONPublicationsMeta = action.payload.meta;
		},
		getChangeOfNamePublicationsError: (state) => {
			// state.CONPublications = [];
			state.CONPublicationsError = true;
			state.loadingCONPublications = false;
		},
		// end change of name publications

		// publishing CON
		publishCON: (state, action) => {
			state.publishingCON = true;
			state.publishCONError = false;
		},
		publishCONSuccess: (state) => {
			state.publishingCON = false;
			state.newCONPublication = null;
			state.newLODPublication = null;
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
			state.newLODPublication = null;
			state.newLODPublication = null;
			state.publishLODSuccess = true;
		},
		publishLODError: (state) => {
			state.publishLODError = true;
			state.publishingLOD = false;
		},
		resetPublishSuccess(state) {
			state.publishCONSuccess = false;
			state.publishLODSuccess = false;
		},
	},
});

export const {
	addNewConPublication,
	clearNewConPublication,
	addNewLodPublication,
	clearNewLodPublication,
} = publicationSlice.actions;

export default publicationSlice.reducer;
