import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./pages/main/Main";
import Movies from "./pages/movies/Movies";
import Profile from "./pages/profile/Profile";
import Series from "./pages/series/Series";
import SearchPage from "./pages/searchPage/SearchPage";
import Layout from "./components/Layout";
import Favourites from "./pages/favourites/Favourites";
import Details from "./pages/details/Details";
import UserContextProvider from "./components/UserContext";
import FavouritesContextProvider from "./context/FavouritesContext";

const router = createBrowserRouter([
	{
		element: <Layout />,
		children: [
			{
				path: "/",
				element: <Main />,
			},
			{
				path: "/movies",
				element: <Movies />,
			},
			{
				path: "/profile",
				element: <Profile />,
			},
			{
				path: "/search",
				element: <SearchPage />,
			},
			{
				path: "/series",
				element: <Series />,
			},
			{
				path: "/favourites",
				element: <Favourites />,
			},
			{
				path: "/details/:type/:id",
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
