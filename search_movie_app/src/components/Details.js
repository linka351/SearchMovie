import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { apiKey, IMG_URL } from "../imageApiKeys";
import "../styles/details.scss";
import { FaXmark } from "react-icons/fa6";

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

	return (
		<>
			<Link to={"/movies"}>
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
						<p>Production: {singleElement.release_date}</p>
						<p className='vote'>{singleElement.vote_average}</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Details;
