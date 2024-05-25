import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { route } from "../../utils/routes";

import "./offcanvas.scss";

function Offcanvas({ showMenu, closeMenu }) {
	const { pathname } = useLocation();
	const addActiveClass = `sidenav ${showMenu ? "active" : ""}`;
	const TabIndex = showMenu ? 0 : -1;

	useEffect(() => {
		closeMenu();
	}, [closeMenu, pathname]);

	return (
		<div className={addActiveClass}>
			<Link className='link' to={route.main} tabIndex={TabIndex}>
				Main Page
			</Link>
			<Link className='link' to={route.movies} tabIndex={TabIndex}>
				Movies
			</Link>
			<Link className='link' to={route.series} tabIndex={TabIndex}>
				Series
			</Link>
			<Link className='link' to={route.favourites} tabIndex={TabIndex}>
				Favourites
			</Link>
		</div>
	);
}

export default Offcanvas;
