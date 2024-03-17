import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { apiKey, IMG_URL } from "../imageApiKeys";
import "../styles/details.scss";
import { FaXmark } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";

function Details() {
	const { id, type } = useParams();
	const navigate = useNavigate();
	const [singleElement, setSingleElement] = useState({});

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/${type}/${id}?api_key=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				setSingleElement(data);
			});
	}, []);

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
								{singleElement.release_date?.slice(0, 4) || "N/A"}
							</span>
						</p>

						<p className='vote'>
							{singleElement.vote_average?.toFixed(1) || "N/A"}
						</p>
					</div>
				</div>
			</div>
		</>
	);
}

export default Details;
