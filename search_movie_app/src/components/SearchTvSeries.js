import ItemGrid from "./ItemGrid";
import { useEffect, useState } from "react";
import { apiKey } from "../imageApiKeys";
import SearchInput from "./SearchInput";

function SearchTvSeries() {
	const [value, setValue] = useState("");
	const [data, setData] = useState([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);

	const changePage = page => {
		setCurrentPage(page);
	};

	const search = e => {
		setCurrentPage(1);
		setValue(e.target.value);
	};

	useEffect(() => {
		fetch(
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
			<SearchInput onChange={search} value={value} />
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

export default SearchTvSeries;
