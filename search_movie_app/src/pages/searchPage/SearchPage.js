import "../../styles/searchPage.scss";
import SearchInput from "./components/SearchInput";
import { useState, useEffect } from "react";
import { apiKey } from "../../api/api";
import ItemGrid from "../../components/ItemGrid";
import useDebounce from "../../hooks/useDebounce";

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

	const fetchPage = () => {
		if (!value) {
			setTotalPages(null);
			setData({ items: [], type: selectedType });

			return;
		}

		fetch(
			`https://api.themoviedb.org/3/search/${selectedType}?api_key=${apiKey}&include_adult=false&language=en-US&page=${currentPage}&query=${value}`
		)
			.then(response => response.json())
			.then(data => {
				setTotalPages(data.total_pages);
				setData({ items: data.results, type: selectedType });
			});
	}

	useDebounce({callback: fetchPage, delay: 500, dependecies: [currentPage, selectedType, value]})

	return (
		<>
			<p className='search-question'>What are you looking for?</p>
			<div className='search-box'>
				<button
					className={`link ${selectedType === "movie" && "active"}`}
					onClick={() => changeType("movie")}>
					Search Movies
				</button>
				<button
					className={`link ${selectedType === "tv" && "active"}`}
					onClick={() => changeType("tv")}>
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
