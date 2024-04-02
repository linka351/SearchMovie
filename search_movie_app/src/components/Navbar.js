import { Link } from "react-router-dom";
import { FaBars, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import Offcanvas from "./Offcanvas";
import "../styles/Navbar.scss";
import "../styles/Offcanvas.scss";
import LoginPanel from "./LoginPanel";
import { useUserContext } from "./UserContext";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};
	const { userLogin } = useUserContext();

	const closeMenu = () => {
		setIsOpen(false);
	};

	return (
		<>
			<div className='navbar'>
				<div className={"left-side-navbar"}>
					{!isOpen ? (
						<FaBars className='fabar-side-nav' onClick={toggleMenu} />
					) : (
						<FaXmark className='faxmark-side-nav' onClick={toggleMenu} />
					)}

					<Link className='navbar-link' to={"/movies"}>
						Movies
					</Link>
					<Link className='navbar-link' to={"/series"}>
						Series
					</Link>
				</div>
				<Link className='navbar-link main' to={"/"}>
					<p>MovieSearch</p>
				</Link>
				<div className='right-side-navbar'>
					<Link className='navbar-link' to={"/searchPage"}>
						<FaMagnifyingGlass className='search' />
					</Link>
					<Link className='navbar-link' to={"/profile"}>
						{userLogin}
					</Link>
				</div>
			</div>
			<Offcanvas showMenu={isOpen} closeMenu={closeMenu} />
			{userLogin === null && <LoginPanel />}
		</>
	);
}

export default Navbar;
