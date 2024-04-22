import { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import ItemGrid from "../../components/itemGrid/ItemGrid";

import { api, apiKey, endpoints } from "../../api/api";
import { dataType } from "../../utils/data.const";

function Movies() {
	const [data, setData] = useState(null);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(null);
	const [error, setError] = useState(null);

	const changePage = page => {
		setCurrentPage(page);
	};

	const showToastMessage = () => {
		toast.error("Failed to fetch", {
			position: "top-right",
		});
	};

	useEffect(() => {
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
				setError(showToastMessage);
			});
	}, [currentPage]);
	return (
		<>
			{error}
			<ItemGrid
				data={data}
				initialPage={currentPage}
				totalPages={totalPages}
				changePage={changePage}
			/>
			<ToastContainer />
		</>
	);
}

export default Movies;
