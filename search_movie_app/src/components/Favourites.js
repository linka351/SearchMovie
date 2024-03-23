import { useFavouritesContext } from "../context/FavouritesContext";
import { IMG_URL } from "../imageApiKeys";

function Favourites() {
	const { favourites } = useFavouritesContext();
	return (
		<>
			<div className='movie-page'>
				{favourites.map(el => {
					return (
						<>
							<div className='image'>
								<img src={`${IMG_URL}${el.backdrop_path}`} />
								<div className='movie-description'>{el.title || el.name}</div>
							</div>
						</>
					);
				})}
			</div>
		</>
	);
}

export default Favourites;
