import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { route } from "../../utils/routes";

import "./offcanvas.scss";

function Offcanvas({ showMenu, closeMenu }) {
	const { pathname } = useLocation();
	const addActiveClass = `sidenav ${showMenu ? "active" : ""}`;
	const changeTabIndex = showMenu ? 0 : -1;

	useEffect(() => {
		closeMenu();
	}, [closeMenu, pathname]);

	return (
		<div data-testid='side-nav' className={addActiveClass}>
			<Link className='link' to={route.main} tabIndex={changeTabIndex}>
				Main Page
			</Link>
			<Link className='link' to={route.movies} tabIndex={changeTabIndex}>
				Movies
			</Link>
			<Link className='link' to={route.series} tabIndex={changeTabIndex}>
				Series
			</Link>
			<Link className='link' to={route.favourites} tabIndex={changeTabIndex}>
				Favourites
			</Link>
		</div>
	);
}

export default Offcanvas;
