import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IBook } from "../types"

interface InitialState {
	modal: "login" | "register" | "add" | "add-quote" | "delete-book" | "none",
	deleteId: string,
	menu: boolean,
	books: Array<IBook>
}

const initialState: InitialState = {
	modal: "none",
	deleteId: "",
	menu: false,
	books: []
}

const slice = createSlice({
	name: "general",
	initialState,
	reducers: {
		setModal: (state, action: PayloadAction<InitialState["modal"]>) => {
			state.modal = action.payload;
		},
		setMenu: (state, action: PayloadAction<InitialState["menu"]>) => {
			state.menu = action.payload
		},
		setBooks: (state, action: PayloadAction<InitialState["books"]>) => {
			state.books = action.payload
		},
		setDeleteId: (state, action: PayloadAction<InitialState["deleteId"]>) => {
			state.deleteId = action.payload
		}
	}
})

export const { setModal, setMenu, setBooks, setDeleteId } = slice.actions;
export default slice.reducer;