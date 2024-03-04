import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Movies from "./components/Movies";
import Profile from "./components/Profile";
import Series from "./components/Series";
import SearchTvSeries from "./components/SearchTvSeries";
import SearchMovie from "./components/SearchMovie";
import SearchPage from "./components/SearchPage";
import Layout from "./components/Layout";

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
				path: "/searchPage",
				element: <SearchPage />,
			},
			{
				path: "/series",
				element: <Series />,
			},
			{
				path: "/searchMovies",
				element: <SearchMovie />,
			},
			{
				path: "/searchTvSeries",
				element: <SearchTvSeries />,
			},
		],
	},
]);

function App() {
	return (
		<div>
			<RouterProvider router={router} />
		</div>
	);
}

export default App;
