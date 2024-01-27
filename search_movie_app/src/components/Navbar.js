import { Link } from "react-router-dom";
import { FaBars, FaMagnifyingGlass, FaXmark } from "react-icons/fa6";
import { useState } from "react";
import Burger from "./offcanvas";
import "../styles/Navbar.scss";
import "../styles/Burger.scss";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<>
			<div className='navbar'>
				<div className={"left-side-navbar"}>
					{!isOpen ? <FaBars className="fabar" onClick={toggleMenu} /> : <FaXmark className="faxmark" onClick={toggleMenu} />}

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
					<Link className='navbar-link' to={"/search"}>
						<FaMagnifyingGlass style={{ color: "white", height: "1.5rem" }} />
					</Link>
					<Link className='navbar-link' to={"/profile"}>
						Profile
					</Link>
				</div>
			</div>
			{<Burger showMenu={isOpen}/>}
			
		</>
	);
}

export default Navbar;
