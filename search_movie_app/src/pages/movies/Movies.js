import { useEffect, useState } from "react";
import { toast } from "react-toastify";

import ItemGrid from "../../components/itemGrid/ItemGrid";

import { api, apiKey, endpoints } from "../../api/api";
import { dataType } from "../../utils/data.const";
import { errorsMesseages } from "../../utils/error.const";

function Movies() {
	const [data, setData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [isLoading, setIsLoading] = useState(true);

	const changePage = page => {
		setCurrentPage(page);
	};

	useEffect(() => {
		setIsLoading(true);
		api
			.get(
				endpoints.movie +
					`/top_rated?api_key=${apiKey}&language=en-US&page=${currentPage}?`
			)
			.then(data => {
				setTotalPages(data.total_pages);
				setData({ items: data.results, type: dataType.movie });
			})
			.catch(() => {
				toast.error(errorsMesseages.failedFetch, {
					position: "top-right",
				});
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, [currentPage]);
	return (
		<>
			<ItemGrid
				isLoading={isLoading}
				data={data}
				initialPage={currentPage}
				totalPages={totalPages}
				changePage={changePage}
			/>
		</>
	);
}

export default Movies;
