import { useCallback, useState } from "react";
import { FaBars, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { BiLogOutCircle } from "react-icons/bi";
import { Tooltip as ReactTooltip } from "react-tooltip";

import { Link } from "react-router-dom";

import Offcanvas from "../offcanvas/Offcanvas";
import LoginPanel from "../loginPanel/LoginPanel";

import { route } from "../../utils/routes";
import { useUserContext } from "../../context/UserContext";

import "./navbar.scss";

function Navbar() {
	const { userLogin, removeFromLocalStorage } = useUserContext();

	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	const closeMenu = useCallback(() => {
		setIsOpen(false);
	}, []);

	const sidenavIcon = !isOpen ? (
		<button onClick={toggleMenu}>
			<FaBars className='fabar-side-nav' />
		</button>
	) : (
		<button onClick={toggleMenu}>
			<FaXmark className='faxmark-side-nav' />
		</button>
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
					<Link
						to={"/"}
						onClick={removeFromLocalStorage}
						className='navbar-link'
						data-tooltip-id='tooltip-1'>
						<BiLogOutCircle className='logout' />
					</Link>
				</div>
			</div>
			<Offcanvas showMenu={isOpen} closeMenu={closeMenu} />
			{userExist}
			<ReactTooltip id='tooltip-1' place='left' content='Logout' />
		</>
	);
}

export default Navbar;
