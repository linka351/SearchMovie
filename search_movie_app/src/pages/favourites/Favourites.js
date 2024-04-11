import { Link } from "react-router-dom";
import { IMG_URL } from "../../api/api";
import noImage from "../../images/noImage.jpg";
import "../../styles/itemGrid.scss";

function Favourites() {
	const retrievedObject = JSON.parse(localStorage.getItem("favouriteArray"));

	if (retrievedObject === null) return "Brak";

	return (
		<>
			<div className='movie-page'>
				{retrievedObject.map(item => {
					return (
						<>
							<Link className='link' to={`/details/${item.type}/${item.id}`}>
								{item.backdrop_path === null ? (
									<div className='image'>
										<img src={noImage} alt={item.title || item.name} />
										<div className='movie-description'>
											<p>{item.title || item.name}</p>
										</div>
									</div>
								) : (
									<div className='image'>
										<img
											src={`${IMG_URL}${item.backdrop_path}`}
											alt={item.title || item.name}
										/>
										<div className='movie-description'>
											<p>{item.title || item.name}</p>
										</div>
									</div>
								)}
							</Link>
						</>
					);
				})}
			</div>
		</>
	);
}

export default Favourites;
