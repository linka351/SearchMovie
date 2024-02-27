import { useEffect, useState } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/itemGrid.scss";

const apiKey = "c9de2f7b31706574fa92cef28829a225";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

function Search() {
	const [value, setValue] = useState("");
	const [movie, setMovie] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);

	const search = e => {
		setValue(e.target.value);
	};

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&include_adult=false&language=en-US&page=${currentPage}&query=${value}`
		)
			.then(response => response.json())
			.then(data => {
				console.log(data.results);
				setTotalPages(data.total_pages);
				setMovie(data.results);
			});
	}, [value, currentPage]);

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
			<div className='search'>
				<input
					type='text'
					value={value}
					onChange={search}
					placeholder='Czego Szukasz?'
				/>
				<div className='movie-page'>
					{movie.map(item => {
						if (item.backdrop_path === null) {
							return (
								<div className='image'>
									<div className='icon-container'>
										<FaEyeSlash className='icon' />
									</div>
									<div className='movie-description'>
										<p>{item.title || item.name}</p>
									</div>
								</div>
							);
						}
						if (item.media_type === "movie" || item.media_type === "tv") {
							return (
								<div className='image'>
									<img
										src={`${IMG_URL}${item.backdrop_path}`}
										alt={item.title || item.name}
									/>
									<div className='movie-description'>
										<p>{item.title || item.name}</p>
									</div>
								</div>
							);
						}
					})}
				</div>
			</div>
		</>
	);
}

export default Search;
