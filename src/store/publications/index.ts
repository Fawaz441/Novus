import { createSlice } from '@reduxjs/toolkit';
import type { PayloadAction } from '@reduxjs/toolkit';
import {
	ChangeOfNamePublicationValues,
	PublicationsState,
} from 'interfaces/publications';

const initialState: PublicationsState = {
	loading_con_publications: false,
	new_con_publication: null,
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
	},
});

export const { addNewConPublication, clearNewConPublication } =
	publicationSlice.actions;

export default publicationSlice.reducer;
