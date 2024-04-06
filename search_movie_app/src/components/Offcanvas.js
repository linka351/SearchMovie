import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { route } from "../utils/routes";

import "../styles/Offcanvas.scss";

function Offcanvas({ showMenu, closeMenu }) {
	const { pathname } = useLocation();

	useEffect(() => {
		closeMenu();
	}, [closeMenu, pathname]);

	return (
		<div className={`sidenav ${showMenu ? "active" : ""}`}>
			<Link className='link' to={route.main}>
				Main Page
			</Link>
			<Link className='link' to={route.movies}>
				Movies
			</Link>
			<Link className='link' to={route.series}>
				Series
			</Link>
			<Link className='link' to={route.favourites}>
				Favourites
			</Link>
		</div>
	);
}

export default Offcanvas;
