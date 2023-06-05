import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	ChangeOfNamePublicationFields,
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationFields,
	LossOfDocumentPublicationValues,
	PublicationsListMeta,
	PublicationsState,
	PublisherPrice,
} from 'interfaces/publications';
import { PUBLICATION_TYPES } from 'utils/constants';

const initialState: PublicationsState = {
	// loaders
	loadingCONPublications: true,
	loadingLODPublications: true,
	loadingPublisherPrices: false,
	publishingCON: false,
	publishingLOD: false,
	// data
	LODPublications: [],
	newCONPublication: null,
	newLODPublication: null,
	CONPublications: [],
	CONPublicationsMeta: null,
	LODPublicationsMeta: null,
	publisherPrices: [],
	// success
	publishCONSuccess: false,
	publishLODSuccess: false,
	// error
	LODPublicationsError: false,
	CONPublicationsError: false,
	publisherPricesError: false,
	publishCONError: false,
	publishLODError: false,
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
		clearPublisherPrices:(state)=>{
			state.publisherPrices = []
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
		getChangeOfNamePublications: (state,action?:PayloadAction<any>) => {
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
		getLostDocumentPublications: (state,action?:PayloadAction<any>) => {
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
