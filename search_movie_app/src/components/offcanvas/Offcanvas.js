import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";

import { route } from "../../utils/routes";

import "./offcanvas.scss";

function Offcanvas({ showMenu, closeMenu }) {
	const { pathname } = useLocation();
	const addActiveClass = `sidenav ${showMenu ? "active" : ""}`;
	const hideOffcanvasLink = showMenu ? 0 : -1;

	useEffect(() => {
		closeMenu();
	}, [closeMenu, pathname]);

	return (
		<div className={addActiveClass}>
			<Link className='link' to={route.main} tabIndex={hideOffcanvasLink}>
				Main Page
			</Link>
			<Link className='link' to={route.movies} tabIndex={hideOffcanvasLink}>
				Movies
			</Link>
			<Link className='link' to={route.series} tabIndex={hideOffcanvasLink}>
				Series
			</Link>
			<Link className='link' to={route.favourites} tabIndex={hideOffcanvasLink}>
				Favourites
			</Link>
		</div>
	);
}

export default Offcanvas;
