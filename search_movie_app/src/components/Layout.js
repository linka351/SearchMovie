import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
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
