import { Link, Outlet } from "react-router-dom";
import { FaBars, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import Burger from "./Burger";
import "../styles/Navbar.scss";
import "../styles/Burger.scss";
import LoginPanel from "./LoginPanel";

function Navbar() {
	
	const [toggle, setToggle] = useState(false);
	const toggleMenu = () => {
		setToggle(!toggle);
	};

	console.log(localStorage.name);
	

	return (
		<>	
			<div className='navbar'>
				<div className={"left-side-navbar"}>
					{!toggle ? (
						<FaBars className='fabar' onClick={toggleMenu} />
					) : (
						<FaXmark className='faxmark' onClick={toggleMenu} />
						)}

					<Link className='navbar-link' to={"/movies"}>
						Movies
					</Link>
					<Link className='navbar-link' to={"/series"}>
						Series
					</Link>
				</div>
				<Link className='navbar-link main' to={"/"}>
					<h1>MovieSearch</h1>
				</Link>
				<div className='right-side-navbar'>
					<Link className='navbar-link' to={"/search"}>
						<FaMagnifyingGlass className="search" />
					</Link>
					<Link className='navbar-link' to={"/profile"}>
							{localStorage.length === 1 ? JSON.parse(localStorage.name) : "Anon"}
					</Link>
				</div>
			</div>
			{toggle && <Burger showMenu={toggle} />}
			<Outlet />
			{localStorage.length === 0 && <LoginPanel />}
		</>
	);
}

export default Navbar;
