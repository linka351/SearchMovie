import { useEffect, useState } from "react";
import { Link, json, useParams } from "react-router-dom";
import { apiKey, IMG_URL } from "../imageApiKeys";
import "../styles/details.scss";
import { FaXmark } from "react-icons/fa6";
import FavouritesIcon from "./FavouritesIcon";

function Details() {
	const params = useParams();
	const [singleElement, setSingleElement] = useState({});

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/movie/${params.id}?api_key=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				setSingleElement(data);
			});
	}, []);

	let existingFavouriteArray = JSON.parse(
		localStorage.getItem("favouriteArray")
	);
	if (existingFavouriteArray === null) {
		localStorage.setItem("favouriteArray", JSON.stringify([]));
	}

	const addInitial = {
		title: singleElement.title,
		backdrop_path: singleElement.backdrop_path,
	};

	const addToStorage = () => {
		const favouriteArray = JSON.parse(localStorage.getItem("favouriteArray"));
		const index = favouriteArray.findIndex(item => {
			return item.title === addInitial.title;
		});

		if (index === -1) {
			favouriteArray.push(addInitial);
			localStorage.setItem("favouriteArray", JSON.stringify(favouriteArray));
		} else {
			favouriteArray.splice(index, 1);
			localStorage.setItem("favouriteArray", JSON.stringify(favouriteArray));
		}
	};

	return (
		<>
			<Link to={singleElement.title ? "/movies" : "/series"}>
				<FaXmark className='faxmark' />
			</Link>
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
								{singleElement.release_date
									? singleElement.release_date.slice(0, 4)
									: "N/A"}
							</span>
						</p>
						<div className='smaller-details-right'>
							<button onClick={addToStorage}>
								<FavouritesIcon />
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
