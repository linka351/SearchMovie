import { Link } from "react-router-dom";
import "../styles/Offcanvas.scss";

function Offcanvas({ showMenu, closeMenu }) {
	return (
		<div className={`sidenav ${showMenu ? "active" : ""}`}>
			<Link className='link' onClick={closeMenu} to={"/"}>
				Main Page
			</Link>
			<Link className='link' onClick={closeMenu} to={"/movies"}>
				Movies
			</Link>
			<Link className='link' onClick={closeMenu} to={"/series"}>
				Series
			</Link>
		</div>
	);
}

export default Offcanvas;
