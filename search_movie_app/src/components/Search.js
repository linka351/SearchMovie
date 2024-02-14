import { useEffect, useState } from "react";

const apiKey = "c9de2f7b31706574fa92cef28829a225";
const IMG_URL = "https://image.tmdb.org/t/p/w500/";

function Search() {
	const [value, setValue] = useState("");
	const [movie, setMovie] = useState([]);

	const search = e => {
		setValue(e.target.value);
	};

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/search/multi?api_key=${apiKey}&include_adult=false&language=en-US&page=1&query=${value}`
		)
			.then(response => response.json())
			.then(data => {
				//console.log(data);
				setMovie(data.results);
			});
	}, [value]);

	return (
		<>
			<div className='search'>
				<input
					type='text'
					value={value}
					onChange={search}
					placeholder='Czego Szukasz?'
				/>
				{movie.map(item => {
					console.log(item);
					if (item.backdrop_path === null) {
						return <p>zdjęcie</p>;
					}
					if (item.media_type === "movie" || item.media_type === "tv") {
						return (
							<img src={`${IMG_URL}${item.backdrop_path}`} alt={item.title} />
						);
					}
				})}
			</div>
		</>
	);
}

export default Search;
