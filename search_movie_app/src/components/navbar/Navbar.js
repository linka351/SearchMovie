import { useCallback, useState } from "react";
import { FaBars, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { Link } from "react-router-dom";

import Offcanvas from "../offcanvas/Offcanvas";
import LoginPanel from "../loginPanel/LoginPanel";

import { route } from "../../utils/routes";
import { useUserContext } from "../../context/UserContext";

import "./navbar.scss";

function Navbar() {
	const { userLogin } = useUserContext();

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = useCallback(() => {
		setIsOpen(false);
	}, []);

	const sidenavIcon = !isOpen ? (
		<FaBars className='fabar-side-nav' onClick={toggleMenu} />
	) : (
		<FaXmark className='faxmark-side-nav' onClick={toggleMenu} />
	);
	const userExist = !userLogin && <LoginPanel />;

	return (
		<>
			<div className='navbar'>
				<div className={"left-side-navbar"}>
					{sidenavIcon}
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
					<p className='user-name'>{userLogin}</p>
				</div>
			</div>
			<Offcanvas showMenu={isOpen} closeMenu={closeMenu} />
			{userExist}
		</>
	);
}

export default Navbar;
