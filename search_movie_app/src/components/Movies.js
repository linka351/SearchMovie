import { useEffect, useState } from "react";
import "../styles/Movies.scss";
import { Link } from "react-router-dom";

const apiKey = "c9de2f7b31706574fa92cef28829a225";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

function Movies() {
	const [data, setData] = useState([]);
	const [getPage, setGetPage] = useState(1);
	const [pages, setPages] = useState(null);

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${getPage}?`
		)
			.then(response => response.json())
			.then(data => {
				setPages(data.total_pages);
				setData(data.results);
			});
	}, [getPage]);

	const takeToNextPage = () => {
		if (getPage === pages) return;
		setGetPage(prev => prev + 1);
	};

	const takeToPreviousPage = () => {
		if (getPage === 1) return;
		setGetPage(prev => prev - 1);
	};

	return (
		<>
			<div className='buttons-direction'>
				<button onClick={takeToPreviousPage}>Prev</button>
				<p>{`Page ${getPage}/${pages}`}</p>
				<button onClick={takeToNextPage}>Next</button>
			</div>
			<div className='movie-page'>
				{data.map(item => {
					return (
						<Link className='link' to={`/details/${item.id}`}>
							<div className='image'>
								<img
									onClick={() => {
										console.log(item);
									}}
									src={`${IMG_URL}${item.backdrop_path}`}
									alt={item.title}
								/>
								<div className='movie-description'>
									<p>{item.title}</p>
								</div>
							</div>
						</Link>
					);
				})}
			</div>
		</>
	);
}

export default Movies;
