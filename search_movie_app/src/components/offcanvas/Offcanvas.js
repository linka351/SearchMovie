import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { route } from "../../utils/routes";

import "./offcanvas.scss";

function Offcanvas({ showMenu, closeMenu }) {
	const { pathname } = useLocation();
	const addActiveClass = `sidenav ${showMenu ? "active" : ""}`;

	useEffect(() => {
		closeMenu();
	}, [closeMenu, pathname]);

	return (
		<div className={addActiveClass}>
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
