import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentSection: "stats"
}


const slice = createSlice({
	name: "general",
	initialState,
	reducers: {
		changeSection: (state, action) => {
			state.currentSection = action.payload;
		}
	}
})

export const { changeSection } = slice.actions;
export default slice.reducer;