import "./App.css";
import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Main from "./components/Main";
import Movies from "./components/Movies";
import Profile from "./components/Profile";
import Navbar from "./components/Navbar";
import Series from "./components/Series";
import Search from "./components/Search";

const router = createBrowserRouter([
	{
		element: <Navbar />,
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
		],
	},
]);

function App() {
	return (
		<>
			<RouterProvider router={router} />
		</>
	);
}

export default App;
