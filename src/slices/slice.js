import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	currentSection: "stats",
	auth: null
}


const slice = createSlice({
	name: "general",
	initialState,
	reducers: {
		changeSection: (state, action) => {
			state.currentSection = action.payload;
		},
		setAuth: (state, action) => {
			state.auth = action.payload;
		}
	}
})

export const { changeSection, setAuth } = slice.actions;
export default slice.reducer;