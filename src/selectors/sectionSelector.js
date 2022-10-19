import { createSelector } from "@reduxjs/toolkit";

const sectionSelector = createSelector(
	state => state.general.currentSection,
	section => section
)

export default sectionSelector;