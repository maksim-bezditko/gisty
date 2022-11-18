import { createSelector } from "@reduxjs/toolkit";

const sectionSelector = createSelector(
	state => state.general.currentSection,
	section => section
)

export const authSelector = createSelector(
	state => state.general.auth,
	state => state.general.user,
	(auth, user) => [auth, user]
)

export default sectionSelector;