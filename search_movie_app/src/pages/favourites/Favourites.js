import { Link } from "react-router-dom";

import { IMG_URL } from "../../api/api";

import noImage from "../../images/noImage.jpg";
import "../../components/itemGrid/itemGrid.scss";
import "./favourites.scss";

function Favourites() {
	const retrievedObject = JSON.parse(localStorage.getItem("favouriteArray"));

	if (!retrievedObject || retrievedObject.length === 0)
		return (
			<p className='no-favourites'>
				Brak ulubionych pozycji, proszę dodać film lub serial
			</p>
		);

	return (
		<>
			<div className='movie-page'>
				{retrievedObject.map(item => {
					const imageSrc = item.backdrop_path
						? `${IMG_URL}${item.backdrop_path}`
						: noImage;
					const label = item.title || item.name;
					return (
						<>
							<Link className='link' to={`/details/${item.type}/${item.id}`}>
								<div className='image'>
									<img src={imageSrc} alt={label} />
									<div className='movie-description'>
										<p>{label}</p>
									</div>
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
