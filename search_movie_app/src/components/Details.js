import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiKey, IMG_URL } from "../imageApiKeys";
import "../styles/details.scss";
import { FaXmark } from "react-icons/fa6";
import FavouritesIcon from "./FavouritesIcon";
import { useFavouritesContext } from "../context/FavouritesContext";
import { useNavigate } from "react-router-dom";

const formatData = data => {
	const releaseDate = data.release_date || data.first_air_date;
	const title = data.title || data.name;
	const formatedData = {
		...data,
		title,
		release_date: releaseDate.slice(0, 4),
	};

	return formatedData;
};

function Details() {
	const { id, type } = useParams();
	const navigate = useNavigate();
	const [singleElement, setSingleElement] = useState({});
	const { addFavourite, favourites, removeFavourite } = useFavouritesContext();

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				setSingleElement(formatData(data));
			});
	}, []);

	const isFavourite = favourites.some(fav => fav.title === singleElement.title);

	const handleFavouriteClick = () => {
		if (isFavourite) {
			removeFavourite(singleElement.title);
			return;
		}

		addFavourite({
			title: singleElement.title,
			backdrop_path: singleElement.backdrop_path,
			type: type,
			id: id,
		});
	};

	return (
		<>
			<FaXmark onClick={() => navigate(-1)} className='faxmark' />
			<div className='details'>
				<img
					src={`${IMG_URL}${singleElement.backdrop_path}`}
					alt={`${singleElement.title}`}
				/>
				<div className='details-element'>
					<p className='title'>{singleElement.title}</p>
					<p className='overview'>{singleElement.overview}</p>
					<div className='smaller-details'>
						<p className='production'>
							Production:
							<span className='date'>
								{singleElement ? singleElement.release_date : "N/A"}
							</span>
						</p>
						<div className='smaller-details-right'>
							<button onClick={handleFavouriteClick}>
								<FavouritesIcon classname={isFavourite && "active-icon"} />
							</button>

							<p className='vote'>
								{singleElement.vote_average
									? singleElement.vote_average.toFixed(1)
									: "N/A"}
							</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Details;
