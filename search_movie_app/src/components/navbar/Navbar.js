import { useCallback, useState } from "react";
import { Link } from "react-router-dom";
import { FaBars, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";

import LoginPanel from "../LoginPanel";
import Offcanvas from "../Offcanvas";

import { useUserContext } from "../../context/UserContext";
import { route } from "../../utils/routes";

import "./navbar.scss";

function Navbar() {
	const { userLogin } = useUserContext();

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = useCallback( () => {
		setIsOpen(false);
	}, []);

	return (
		<>
			<div className='navbar'>
				<div className={"left-side-navbar"}>
					{!isOpen ? (
						<FaBars className='fabar-side-nav' onClick={toggleMenu} />
					) : (
						<FaXmark className='faxmark-side-nav' onClick={toggleMenu} />
					)}

					<Link className='navbar-link' to={route.movies}>
						Movies
					</Link>
					<Link className='navbar-link' to={route.series}>
						Series
					</Link>
					<Link className='navbar-link' to={route.favourites}>
						Favourites
					</Link>
				</div>
				<Link className='navbar-link main' to={route.main}>
					<p>MovieSearch</p>
				</Link>
				<div className='right-side-navbar'>
					<Link className='navbar-link' to={route.search}>
						<FaMagnifyingGlass className='search' />
					</Link>
					<Link className='navbar-link' to={route.profile}>
						{userLogin}
					</Link>
				</div>
			</div>
			<Offcanvas showMenu={isOpen} closeMenu={closeMenu} />
			{userLogin && <LoginPanel />}
		</>
	);
}

export default Navbar;
