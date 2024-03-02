import "../styles/Movies.scss";
import { IMG_URL } from "../imageApiKeys";

function Favourites() {
	const retrievedObject = JSON.parse(localStorage.getItem("favouriteArray"));
	return (
		<>
			<div className='movie-page'>
				{retrievedObject.map(el => {
					return (
						<>
							<div className='image'>
								<img src={`${IMG_URL}${el.backdrop_path}`} />
								<div className='movie-description'>{el.title}</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}

export default Favourites;
