import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Movies from "./components/Movies";
import Profile from "./components/Profile";
import Series from "./components/Series";
import Search from "./components/Search";
import Layout from "./components/Layout";
import Details from "./components/Details";
import UserContextProvider from "./components/UserContext";

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
				element: <Search />,
			},
			{
				path: "/series",
				element: <Series />,
			},
			{
				path: "/details/:id",
				element: <Details />,
			},
		],
	},
]);

function App() {
	return (
		<UserContextProvider>
			<div>
				<RouterProvider router={router} />
			</div>
		</UserContextProvider>
	);
}

export default App;
