import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modal: "none"
}


const slice = createSlice({
	name: "general",
	initialState,
	reducers: {
		setModal: (state, action) => {
			state.modal = action.payload;
		}
	}
})

export const { setModal } = slice.actions;
export default slice.reducer;