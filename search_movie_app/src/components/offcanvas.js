import "../styles/Offcanvas.scss";

function Offcanvas({ showMenu }) {
	return (
		<div className={`sidenav ${showMenu ? "active" : ""}`}>
			<p>Strona główna</p>
			<p>Filmy</p>
			<p>Seriale</p>
		</div>
	);
}

export default Offcanvas;
