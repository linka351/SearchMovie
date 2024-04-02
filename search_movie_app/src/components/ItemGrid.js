import "../styles/itemGrid.scss";
import { IMG_URL } from "../imageApiKeys";
import noImage from "../images/noImage.jpg";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

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
			{totalPages > 1 && (
				<div className='buttons-direction'>
					<button onClick={takeToPreviousPage}>Prev</button>
					<p>{`Page ${currentPage}/${totalPages}`}</p>
					<button onClick={takeToNextPage}>Next</button>
				</div>
			)}
			<div className='movie-page'>
				{items.map(item => {
					return (
						<>
							<Link to={`/details/${type}/${item.id}`}>
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

export default ItemGrid;
