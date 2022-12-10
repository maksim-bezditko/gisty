import { configureStore } from "@reduxjs/toolkit"
import generalReducer from "../slices/slice"

const rootReducer = {
	general: generalReducer
}

const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
	devTools: import.meta.env.NODE_ENV !== 'production'
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch;

export default store;