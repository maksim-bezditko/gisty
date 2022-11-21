import * as ROUTES from "./paths";
import { Navigate } from "react-router-dom";
import Books from "./pages/Books";
import SingleBook from "./pages/SingleBook";
import Quotes from "./pages/Quotes";
import SingleQuote from "./pages/SingleQuote";
import Stats from "./pages/Stats";
import Settings from "./pages/Settings";
import About from "./pages/About";


export const privateRoutes = [
	{
		path: ROUTES.HOME,
		component: <Navigate to="/books"/>
	},
	{
		path: ROUTES.BOOKS,
		component: <Books/>
	},
	{
		path: ROUTES.SINGLE_BOOK,
		component: <SingleBook/>
	},
	{
		path: ROUTES.QUOTES,
		component: <Quotes/>
	},
	{
		path: ROUTES.SINGLE_QUOTE,
		component: <SingleQuote/>
	},
	{
		path: ROUTES.STATS,
		component: <Stats/>
	},
	{
		path: ROUTES.SETTINGS,
		component: <Settings/>
	},
]

export const publicRoutes = [
	{
		path: ROUTES.HOME,
		component: <Navigate to="/about"/>
	},
	{
		path: ROUTES.ABOUT,
		component: <About/>
	},
]