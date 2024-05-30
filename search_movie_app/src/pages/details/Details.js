import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";

import FavouritesIcon from "./components/FavouritesIcon";

import { api, apiKey, endpoints, IMG_URL } from "../../api/api";
import { useFavouritesContext } from "../../context/FavouritesContext";

import noImage from "../../images/noImage.jpg";
import "./details.scss";

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
		api
			.get(endpoints.details + `/${type}/${id}?api_key=${apiKey}`)
			.then(data => {
				setSingleElement(formatData(data));
			});
	}, [id, type]);

	const isFavourite = favourites.some(
		fav => Number(fav.id) === singleElement.id
	);

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

	const imageSrc = singleElement.backdrop_path
		? `${IMG_URL}${singleElement.backdrop_path}`
		: noImage;
	const date = singleElement ? singleElement.release_date : "N/A";
	const rating = singleElement.vote_average
		? singleElement.vote_average.toFixed(1)
		: "N/A";
	const activeIconClassName = isFavourite && "active-icon";

	return (
		<>
			<button className='arrow' onClick={() => navigate(-1)}>
				<FaArrowLeft />
			</button>

			<div className='details'>
				<img src={imageSrc} alt={`${singleElement.title}`} />

				<div className='details-element'>
					<p className='title'>{singleElement.title}</p>
					<p className='overview'>{singleElement.overview}</p>
					<div className='smaller-details'>
						<p className='production'>
							Production:
							<span className='date'>{date}</span>
						</p>
						<div className='smaller-details-right'>
							<button onClick={handleFavouriteClick} aria-label='favourites'>
								<FavouritesIcon classname={activeIconClassName} />
							</button>

							<p className='vote'>{rating}</p>
						</div>
					</div>
				</div>
			</div>
		</>
	);
}

export default Details;
