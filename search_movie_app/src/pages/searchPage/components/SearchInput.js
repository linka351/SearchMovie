import "./searchInput.scss";

function SearchInput({ onChange, value }) {
	const handleChange = e => {
		onChange(e.target.value);
	};

	return (
		<>
			<div className='input-container'>
				<input
					className='search-input'
					type='text'
					value={value}
					onChange={handleChange}
					placeholder='Czego Szukasz?'
				/>
			</div>
		</>
	);
}

export default SearchInput;
