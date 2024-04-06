import "./App.scss";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Movies from "./components/Movies";
import Profile from "./components/Profile";
import Series from "./components/Series";
import SearchPage from "./components/SearchPage";
import Layout from "./components/Layout";
import Favourites from "./components/Favourites";
import Details from "./components/Details";
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
