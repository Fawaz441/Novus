import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	ChangeOfNamePublicationValues,
	LossOfDocumentPublicationValues,
	PublicationsState,
} from 'interfaces/publications';

const initialState: PublicationsState = {
	loading_con_publications: false,
	loading_lod_pulications: false,
	new_con_publication: null,
	new_lod_publication: null,
};

export const publicationSlice = createSlice({
	name: 'counter',
	initialState,
	reducers: {
		addNewConPublication: (
			state,
			action: PayloadAction<ChangeOfNamePublicationValues>
		) => {
			state.new_con_publication = action.payload;
		},
		clearNewConPublication: (state) => {
			state.new_con_publication = null;
		},
		addNewLodPublication: (
			state,
			action: PayloadAction<LossOfDocumentPublicationValues>
		) => {
			state.new_lod_publication = action.payload;
		},
		clearNewLodPublication: (state) => {
			state.new_lod_publication = null;
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
