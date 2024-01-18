import "../styles/Main.scss";
import { Link } from "react-router-dom";

function Main() {
	return (
		<div>
			<Link to={"/movies"}>
				<p>SearchMovie</p>
			</Link>
		</div>
	);
}

export default Main;
