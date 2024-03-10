import "../styles/searchPage.scss";
import SearchInput from "./SearchInput";
import { useState, useEffect } from "react";
import { apiKey } from "../imageApiKeys";
import ItemGrid from "./ItemGrid";

function SearchPage() {
	const [value, setValue] = useState("");
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [searchItem, setSearchItem] = useState(true);

	const changePage = page => {
		setCurrentPage(page);
	};

	const searchMovie = e => {
		e.preventDefault();
		setSearchItem(true);
		setValue("");
	};
	const searchTvSeries = e => {
		e.preventDefault();
		setSearchItem(false);
		setValue("");
	};

	const search = e => {
		setCurrentPage(1);
		setValue(e.target.value);
	};

	useEffect(() => {
		searchItem
			? fetch(
					`https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&include_adult=false&language=en-US&page=${currentPage}&query=${value}`
			  )
					.then(response => response.json())
					.then(data => {
						setTotalPages(data.total_pages);
						setData(data.results);
					})
			: fetch(
					`https://api.themoviedb.org/3/search/tv?api_key=${apiKey}&include_adult=false&language=en-US&page=${currentPage}&query=${value}`
			  )
					.then(response => response.json())
					.then(data => {
						setTotalPages(data.total_pages);
						setData(data.results);
					});
	}, [currentPage, value]);

	return (
		<>
			<SearchInput
				onChange={search}
				value={value}
				searchItem={searchItem}
				searchMovie={searchMovie}
				searchTvSeries={searchTvSeries}
			/>
			{data.length === 0 && value.length > 0 && "Brak wpisanego elementu"}
			<ItemGrid
				data={data}
				currentPage={currentPage}
				totalPages={totalPages}
				changePage={changePage}
			/>
		</>
	);
}

export default SearchPage;
