import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const initialState = {
	currentSection: "stats",
	auth: false,
	user: null
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
		},
		setUser: (state, action) => {
			state.user = action.payload;
		}
	}
})

export const { changeSection, setAuth, setUser } = slice.actions;
export default slice.reducer;