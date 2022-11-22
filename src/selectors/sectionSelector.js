import { createSelector } from "@reduxjs/toolkit";

export const modalSelector = createSelector(
	state => state.general.modal,
	(modal) => modal
)

export const authSelector = createSelector(
	state => state.general.auth,
	(auth) => auth
)

export const menuSelector = createSelector(
	state => state.general.menu,
	menu => menu
)

export const booksSelector = createSelector(
	state => state.general.books,
	books => books
)