import { RouterProvider, createBrowserRouter } from "react-router-dom";

import UserContextProvider from "./context/UserContext";
import FavouritesContextProvider from "./context/FavouritesContext";

import Details from "./pages/details/Details";
import Favourites from "./pages/favourites/Favourites";
import Main from "./pages/main/Main";
import Movies from "./pages/movies/Movies";
import Profile from "./pages/profile/Profile";
import Layout from "./components/Layout";
import Series from "./pages/series/Series";
import SearchPage from "./pages/searchPage/SearchPage";

import { route } from "./utils/routes";

import "./App.scss";

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: route.main,
				element: <Main />,
			},
			{
				path: route.movies,
				element: <Movies />,
			},
			{
				path: route.profile,
				element: <Profile />,
			},
			{
				path: route.search,
				element: <SearchPage />,
			},
			{
				path: route.series,
				element: <Series />,
			},
			{
				path: route.favourites,
				element: <Favourites />,
			},
			{
				path: route.details + "/:type/:id",
				element: <Details />,
			},
		],
	},
]);

function App() {
	return (
		<UserContextProvider>
			<FavouritesContextProvider>
				<RouterProvider router={router} />
			</FavouritesContextProvider>
		</UserContextProvider>
	);
}

export default App;
