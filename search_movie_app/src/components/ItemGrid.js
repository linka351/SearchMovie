import ReactLoading from "react-loading";
import { Link } from "react-router-dom";

import { IMG_URL } from "../api/api";
import { route } from "../utils/routes";

import noImage from "../images/noImage.jpg";
import "../styles/itemGrid.scss";

function ItemGrid({ data, currentPage, totalPages, changePage }) {
	if (!data) {
		return (
			<ReactLoading type='spin' height={"20%"} color='black' width={"20%"} />
		);
	}

	const takeToNextPage = () => {
		if (currentPage === totalPages) return;
		changePage(prev => prev + 1);
	};

	const takeToPreviousPage = () => {
		if (currentPage === 1) return;
		changePage(prev => prev - 1);
	};

	const { items, type } = data;

	return (
		<>
			<div className='buttons-direction'>
				{totalPages ? (
					""
				) : (
					<>
						<button onClick={takeToPreviousPage}>Prev</button>
						<p>{`${currentPage}/${totalPages}`}</p>
						<button onClick={takeToNextPage}>Next</button>
					</>
				)}
			</div>
			<div className='movie-page'>
				{items?.map(item => {
					return (
						<Link className='link' to={route.details + `/${type}/${item.id}`}>
							{item.backdrop_path ? (
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
					);
				})}
			</div>
		</>
	);
}

export default ItemGrid;
