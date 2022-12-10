import { Navigate } from "react-router-dom";
import Books from "../pages/Books/Books";
import SingleBook from "../pages/SingleBook/SingleBook";
import Quotes from "../pages/Quotes/Quotes";
import Stats from "../pages/Stats/Stats";
import Settings from "../pages/Settings/Settings";
import About from "../pages/About/About";
import React from "react";

import { Routes } from "./paths";

interface Route {
	path: Routes,
	component: React.ReactNode
}

export const privateRoutes: Array<Route> = [
	{
		path: Routes.HOME,
		component: <Navigate to="books"/>
	},
	{
		path: Routes.BOOKS,
		component: <Books/>
	},
	{
		path: Routes.SINGLE_BOOK,
		component: <SingleBook/>
	},
	{
		path: Routes.QUOTES,
		component: <Quotes/>
	},
	{
		path: Routes.STATS,
		component: <Stats/>
	},
	{
		path: Routes.SETTINGS,
		component: <Settings/>
	},
]

export const publicRoutes: Array<Route> = [
	{
		path: Routes.HOME,
		component: <Navigate to="/about"/>
	},
	{
		path: Routes.ABOUT,
		component: <About/>
	},
]