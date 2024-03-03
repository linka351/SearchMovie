import "../styles/itemGrid.scss";
import { IMG_URL } from "../imageApiKeys";
import noImage from "../images/noImage.jpg";

function ItemGrid({ data, currentPage, totalPages, changePage }) {
	const takeToNextPage = () => {
		if (currentPage === totalPages) return;
		changePage(prev => prev + 1);
	};

	const takeToPreviousPage = () => {
		if (currentPage === 1) return;
		changePage(prev => prev - 1);
	};

	return (
		<>
			<div className='buttons-direction'>
				<button onClick={takeToPreviousPage}>Prev</button>
				<p>{`Page ${currentPage}/${totalPages}`}</p>
				<button onClick={takeToNextPage}>Next</button>
			</div>
			<div className='movie-page'>
				{data.map(item => {
					return (
						<>
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
						</>
					);
				})}
			</div>
		</>
	);
}

export default ItemGrid;
