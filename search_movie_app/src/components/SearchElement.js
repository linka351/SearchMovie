import { useState, useEffect } from "react";
import { FaEyeSlash } from "react-icons/fa6";
import "../styles/itemGrid.scss";
import "../styles/searchInput.scss";

const apiKey = process.env.REACT_APP_IMAGE_API_KEY;
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

function SearchElement({ searchApi }) {
	const [value, setValue] = useState("");
	const [movie, setMovie] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/search/${searchApi}?api_key=${apiKey}&include_adult=false&language=en-US&page=${currentPage}&query=${value}`
		)
			.then(response => response.json())
			.then(data => {
				setTotalPages(data.total_pages);
				setMovie(data.results);
			});
	}, [value, currentPage]);

	const search = e => {
		setCurrentPage(1);
		setValue(e.target.value);
	};

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
			{value.length > 0 && (
				<div className='buttons-direction'>
					<button onClick={takeToPreviousPage}>Prev</button>
					<p>{value === "" ? "" : `Page: ${currentPage} / ${totalPages}`}</p>
					<button onClick={takeToNextPage}>Next</button>
				</div>
			)}
			<div className='input-container'>
				<input
					className='search-input'
					type='text'
					value={value}
					onChange={search}
					placeholder='Czego Szukasz?'
				/>
			</div>
			<div className='movie-page'>
				{movie.map(item => {
					console.log(item);
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
				})}
			</div>
		</>
	);
}

export default SearchElement;
