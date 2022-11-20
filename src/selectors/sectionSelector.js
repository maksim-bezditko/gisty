import { createSelector } from "@reduxjs/toolkit";

export const modalSelector = createSelector(
	state => state.general.modal,
	(modal) => modal
)