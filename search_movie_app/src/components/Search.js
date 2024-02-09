import { useEffect, useState } from "react";

//https://api.themoviedb.org/3/search/keyword
const apiKey = "c9de2f7b31706574fa92cef28829a225";
//const IMG_URL = 'https://image.tmdb.org/t/p/w500/';

function Search() {
	const [value, setValue] = useState("");
	const [movie, setMovie] = useState([]);

	useEffect(() => {
		fetch(`https://api.themoviedb.org/3/search/keyword?api_key=${apiKey}`)
			.then(response => response.json())
			.then(data => {
				setMovie(data);
			});
	});

	const search = e => {
		setValue(e.target.value);
	};

	return (
		<>
			<div className='search'>
				<input
					type='text'
					value={value}
					onInput={search}
					placeholder='Czego Szukasz?'
				/>
			</div>
		</>
	);
}

export default Search;
