import { Link } from "react-router-dom";
import { IMG_URL } from "../../api/api";

function Favourites() {
	const retrievedObject = JSON.parse(localStorage.getItem("favouriteArray"));

	if (retrievedObject === null) return "Brak";

	return (
		<>
			<div className='movie-page'>
				{retrievedObject.map(el => {
					return (
						<>
							<Link className='link' to={`/details/${el.type}/${el.id}`}>
								<div className='image'>
									<img src={`${IMG_URL}${el.backdrop_path}`} />
									<div className='movie-description'>{el.title || el.name}</div>
								</div>
							</Link>
						</>
					);
				})}
			</div>
		</>
	);
}

export default Favourites;
