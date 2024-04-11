import ItemGrid from "../../components/ItemGrid";
import { useEffect, useState } from "react";
import { apiKey } from "../../api/api";
import { dataType } from "../../utils/data.const";

function Movies() {
	const [data, setData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);

	const changePage = page => {
		setCurrentPage(page);
	};

	useEffect(() => {
		fetch(
			`https://api.themoviedb.org/3/movie/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}?`
		)
			.then(response => response.json())
			.then(data => {
				setTotalPages(data.total_pages);
				setData({ items: data.results, type: dataType.movie });
			});
	}, [currentPage]);
	return (
		<ItemGrid
			data={data}
			currentPage={currentPage}
			totalPages={totalPages}
			changePage={changePage}
		/>
	);
}

export default Movies;
