import ReactLoading from "react-loading";
import { Link } from "react-router-dom";
import { useState } from "react";

import { IMG_URL } from "../../api/api";
import { route } from "../../utils/routes";

import noImage from "../../images/noImage.jpg";
import useDebounce from "../../hooks/useDebounce";
import "./itemGrid.scss";

function ItemGrid({ data, initialPage, totalPages, changePage, isLoading }) {
	const [currentPage, setCurrentPage] = useState(initialPage);

	const updatePage = () => {
		changePage(currentPage);
	};

	useDebounce({
		callback: updatePage,
		delay: 200,
		dependecies: [currentPage],
	});
	if (isLoading) {
		return (
			<ReactLoading
				data-testId='loader'
				className='loader'
				type='spin'
				height={"15%"}
				color='white'
				width={"15%"}
			/>
		);
	}

	if (data.items.length === 0) {
		return <p className='search-info'>Podaj Film z bazy danych</p>;
	}

	const takeToNextPage = () => {
		if (currentPage === totalPages) return;
		setCurrentPage(prev => prev + 1);
	};

	const takeToPreviousPage = () => {
		if (currentPage === 1) return;
		setCurrentPage(prev => prev - 1);
	};

	const { items, type } = data;
	const pageCounter = `${currentPage}/${totalPages}`;

	return (
		<>
			<div className='buttons-container'>
				{totalPages && (
					<div className='buttons-direction'>
						<button
							className='change-page'
							onClick={takeToPreviousPage}
							disabled={currentPage === 1}>
							Prev
						</button>
						<p>{pageCounter}</p>
						<button
							data-testid='next'
							onClick={takeToNextPage}
							className='change-page'
							disabled={currentPage === totalPages}>
							Next
						</button>
					</div>
				)}
			</div>
			<div className='movie-page'>
				{items?.map(item => {
					const imageSrc = item.backdrop_path
						? `${IMG_URL}${item.backdrop_path}`
						: noImage;
					const label = item.title || item.name;
					return (
						<Link
							key={item.id}
							className='link'
							to={route.details + `/${type}/${item.id}`}>
							<div className='image'>
								<img src={imageSrc} alt={label} />
								<div className='movie-description'>
									<p>{label}</p>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}

export default ItemGrid;
