
import "../styles/Burger.scss"

function Burger({showMenu}) {
    return (
        <div className= {`sidenav ${showMenu ? "active" : ""}`}>
            <p>Strona główna</p>
            <p>Filmy</p>
            <p>Seriale</p>
        </div>
    )
}

export default Burger