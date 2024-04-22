import { Outlet } from "react-router-dom";

import Footer from "../footer/Footer";
import Navbar from "../navbar/Navbar";

import "./layout.scss";
import "../../styles/loader.scss";

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
