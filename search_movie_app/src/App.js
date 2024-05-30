import { RouterProvider, createBrowserRouter } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import UserContextProvider from "./context/UserContext";
import FavouritesContextProvider from "./context/FavouritesContext";

import Details from "./pages/details/Details";
import Favourites from "./pages/favourites/Favourites";
import Main from "./pages/main/Main";
import Movies from "./pages/movies/Movies";
import Layout from "./components/layout/Layout";
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
		<>
			<UserContextProvider>
				<FavouritesContextProvider>
					<RouterProvider router={router} />
				</FavouritesContextProvider>
			</UserContextProvider>
			<ToastContainer position='top-right' />
		</>
	);
}

export default App;
