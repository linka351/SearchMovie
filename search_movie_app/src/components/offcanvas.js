import { Link, useLocation } from "react-router-dom";
import "../styles/Offcanvas.scss";
import { useEffect } from "react";

function Offcanvas({ showMenu, closeMenu }) {
	const { pathname } = useLocation();

	useEffect(() => {
		closeMenu();
	}, [pathname]);

	return (
		<div className={`sidenav ${showMenu ? "active" : ""}`}>
			<Link className='link' to={"/"}>
				Main Page
			</Link>
			<Link className='link' to={"/movies"}>
				Movies
			</Link>
			<Link className='link' to={"/series"}>
				Series
			</Link>
			<Link className='link' to={"/favourites"}>
				Favourites
			</Link>
		</div>
	);
}

export default Offcanvas;
