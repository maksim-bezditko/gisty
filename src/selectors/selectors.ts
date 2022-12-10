import { createSelector } from "@reduxjs/toolkit";
import type { RootState } from "../store/store";

export const modalSelector = createSelector(
	(state: RootState) => state.general.modal,
	(modal) => modal
)

export const menuSelector = createSelector(
	(state: RootState) => state.general.menu,
	menu => menu
)

export const booksSelector = createSelector(
	(state: RootState) => state.general.books,
	books => books
)

export const bookToDeleteSelector = createSelector(
	(state: RootState) => state.general.deleteId,
	bookToDelete => bookToDelete
)

export const quotesSelector = createSelector(
	(state: RootState) => state.general.books,
	(books: any[]) => {
		let arr: any = [];

		for (let i of books) {
			arr.concat(i.quotes)
		}

		return arr;
	}
)