import "../styles/searchInput.scss";

function SearchInput({
	onChange,
	value,
	searchItem,
	searchMovie,
	searchTvSeries,
}) {
	return (
		<>
			<p className='search-question'>What are you looking for?</p>
			<div className='search-box'>
				<button
					className={`link ${searchItem && "active"}`}
					onClick={searchMovie}>
					Search Movies
				</button>
				<button
					className={`link ${!searchItem && "active"}`}
					onClick={searchTvSeries}>
					Search Tv Series
				</button>
			</div>
			<div className='input-container'>
				<input
					className='search-input'
					type='text'
					value={value}
					onChange={onChange}
					placeholder='Czego Szukasz?'
				/>
			</div>
		</>
	);
}

export default SearchInput;
