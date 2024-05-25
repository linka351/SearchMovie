import { useState } from "react";
import { ToastContainer } from "react-toastify";

import ItemGrid from "../../components/itemGrid/ItemGrid";
import SearchInput from "./components/SearchInput";

import { api, apiKey, endpoints } from "../../api/api";
import useDebounce from "../../hooks/useDebounce";
import { showToastMessage } from "../../utils/error.const";

import "./searchPage.scss";

function SearchPage() {
	const [value, setValue] = useState("");
	const [data, setData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [selectedType, setSelectedType] = useState("movie");
	const [isLoading, setIsLoading] = useState(true);

	const changePage = page => {
		setCurrentPage(page);
	};

	const changeType = type => {
		setSelectedType(type);
	};

	const search = value => {
		setCurrentPage(1);
		setValue(value);
	};

	const fetchPage = () => {
		if (!value) {
			setTotalPages(null);
			setData({ items: [], type: selectedType });
			setIsLoading(false);
			return;
		}

		setIsLoading(true);

		api

			.get(
				endpoints.searchPage +
					`/${selectedType}?api_key=${apiKey}&include_adult=false&language=en-US&page=${currentPage}&query=${value}`
			)
			.then(data => {
				setTotalPages(data.total_pages);
				setData({ items: data.results, type: selectedType });
			})
			.catch(() => {
				showToastMessage();
			})
			.finally(() => {
				setIsLoading(false);
			});
	};

	useDebounce({
		callback: fetchPage,
		delay: 500,
		dependecies: [currentPage, selectedType, value],
	});

	const selectMoviesClassName = `link ${selectedType === "movie" && "active"}`;
	const selectTvClasssName = `link ${selectedType === "tv" && "active"}`;

	return (
		<>
			<p className='search-question'>What are you looking for?</p>
			<div className='search-box'>
				<button
					className={selectMoviesClassName}
					onClick={() => changeType("movie")}>
					Search Movies
				</button>
				<button className={selectTvClasssName} onClick={() => changeType("tv")}>
					Search Tv Series
				</button>
			</div>
			<SearchInput onChange={search} value={value} />
			<ItemGrid
				isLoading={isLoading}
				data={data}
				initialPage={currentPage}
				totalPages={totalPages}
				changePage={changePage}
			/>
			<ToastContainer />
		</>
	);
}

export default SearchPage;
