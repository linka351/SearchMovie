import "../styles/Main.scss";
import { Link } from "react-router-dom";

function Navbar() {
	return (
		<div style={{ display: "flex", justifyContent: "space-between" }}>
			<div style={{ display: "flex" }}>
				<p style={{margin: 0}}>Burger</p>
				<Link to={"/movies"}>Movies</Link>
				<Link to={"/series"}>Series</Link>
			</div>
			<Link to={"/"}>MoviesSearch</Link>
			<div style={{ display: "flex" }}>
				<Link to={"/search"}>Search</Link>
				<Link to={"/profile"}>Profile</Link>
			</div>
		</div>
	);
}

export default Navbar;
