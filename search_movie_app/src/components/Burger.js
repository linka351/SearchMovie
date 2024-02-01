//Animacje nie działa transition

import "../styles/Burger.scss"

function Burger({showMenu}) {
    return (
        <div className={showMenu ? "sidenav active" : "sidenav"}>
            <p>Strona główna</p>
            <p>Filmy</p>
            <p>Seriale</p>
        </div>
    )
}

export default Burger