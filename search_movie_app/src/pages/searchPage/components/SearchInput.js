import "./searchInput.scss";

function SearchInput({ onChange, value }) {
	return (
		<>
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
