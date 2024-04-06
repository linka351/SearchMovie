import { Outlet } from "react-router-dom";

import Footer from "./Footer";
import Navbar from "./navbar/Navbar";

import "../styles/layout.scss";

function Layout() {
	return (
		<>
			<Navbar />
			<div className='footer-position'>
				<Outlet />
			</div>
			<Footer />
		</>
	);
}

export default Layout;
