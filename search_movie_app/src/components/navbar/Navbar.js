import { useCallback, useState } from "react";
import { FaBars, FaMagnifyingGlass, FaXmark, FaHeart } from "react-icons/fa6";
import { BiLogOutCircle, BiCameraMovie } from "react-icons/bi";
import { FaRegUser } from "react-icons/fa";
import { MdLocalMovies } from "react-icons/md";

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
		<button aria-label='toggle side navigation' onClick={toggleMenu}>
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
						<div className='navbar-icon'>
							<MdLocalMovies className='icon-item' />
							Movies
						</div>
					</Link>
					<Link className='navbar-link' to={route.series}>
						<div className='navbar-icon'>
							<BiCameraMovie className='icon-item' />
							Series
						</div>
					</Link>
					<Link className='navbar-link' to={route.favourites}>
						<div className='navbar-icon'>
							<FaHeart className='icon-item' />
							Favourites
						</div>
					</Link>
				</div>
				<Link className='navbar-link main' to={route.main}>
					<p>MovieSearch</p>
				</Link>
				<div className='right-side-navbar'>
					<Link className='navbar-link' to={route.search}>
						<div className='navbar-icon'>
							<FaMagnifyingGlass className='icon-item' />
							Search
						</div>
					</Link>
					<Link
						to={"/"}
						onClick={removeFromLocalStorage}
						className='navbar-link'
						data-tooltip-id='tooltip-1'>
						<div className='navbar-icon'>
							<BiLogOutCircle className='icon-item' />
							Logout
						</div>
					</Link>
					<div className='navbar-icon'>
						<FaRegUser className='login-icon' />
						<p className='user-name'>{userLogin}</p>
					</div>
				</div>
			</div>
			<Offcanvas showMenu={isOpen} closeMenu={closeMenu} />
			{userExist}
			<ReactTooltip id='tooltip-1' place='left' content='Logout' />
		</>
	);
}

export default Navbar;
