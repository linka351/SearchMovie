import { useEffect, useState } from "react";
import "../styles/Movies.scss";
import { IMG_URL, apiKey } from "../imageApiKeys";

function MovieTvSeriesList({ api }) {
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/${api}/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}?`
		)
			.then(response => response.json())
			.then(data => {
				setTotalPages(data.total_pages);
				setData(data.results);
			});
	}, [currentPage]);

	const takeToNextPage = () => {
		if (currentPage === totalPages) return;
		setCurrentPage(prev => prev + 1);
	};

	const takeToPreviousPage = () => {
		if (currentPage === 1) return;
		setCurrentPage(prev => prev - 1);
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
						<div className='image'>
							<img
								onClick={() => {}}
								src={`${IMG_URL}${item.backdrop_path}`}
								alt={item.title || item.name}
							/>
							<div className='movie-description'>
								<p>{item.title || item.name}</p>
							</div>
						</div>
					);
				})}
			</div>
		</>
	);
}

export default MovieTvSeriesList;
