import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	modal: "none",
	menu: false
}


const slice = createSlice({
	name: "general",
	initialState,
	reducers: {
		setModal: (state, action) => {
			state.modal = action.payload;
		},
		setMenu: (state, action) => {
			state.menu = action.payload
		}
	}
})

export const { setModal, setMenu } = slice.actions;
export default slice.reducer;