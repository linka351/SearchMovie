import { useState } from "react";

import ItemGrid from "../../components/itemGrid/ItemGrid";
import SearchInput from "./components/SearchInput";

import { api, apiKey, endpoints } from "../../api/api";
import useDebounce from "../../hooks/useDebounce";

import "./searchPage.scss";

function SearchPage() {
	const [value, setValue] = useState("");
	const [data, setData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [selectedType, setSelectedType] = useState("movie");

	const changePage = page => {
		setCurrentPage(page);
	};

	const changeType = type => {
		setSelectedType(type);
	};

	const search = e => {
		setCurrentPage(1);
		setValue(e.target.value);
	};

	const selectedTypeMovies = `link ${selectedType === "movie" && "active"}`;
	const selectedTypeTv = `link ${selectedType === "tv" && "active"}`;

	const fetchPage = () => {
		if (!value) {
			setTotalPages(null);
			setData({ items: [], type: selectedType });

			return;
		}

		api

			.get(
				endpoints.searchPage +
					`/${selectedType}?api_key=${apiKey}&include_adult=false&language=en-US&page=${currentPage}&query=${value}`
			)
			.then(data => {
				setTotalPages(data.total_pages);
				setData({ items: data.results, type: selectedType });
			});
	};

	useDebounce({
		callback: fetchPage,
		delay: 500,
		dependecies: [currentPage, selectedType, value],
	});

	return (
		<>
			<p className='search-question'>What are you looking for?</p>
			<div className='search-box'>
				<button
					className={selectedTypeMovies}
					onClick={() => changeType("movie")}>
					Search Movies
				</button>
				<button className={selectedTypeTv} onClick={() => changeType("tv")}>
					Search Tv Series
				</button>
			</div>
			<SearchInput onChange={search} value={value} />
			<ItemGrid
				data={data}
				initialPage={currentPage}
				totalPages={totalPages}
				changePage={changePage}
			/>
		</>
	);
}

export default SearchPage;
