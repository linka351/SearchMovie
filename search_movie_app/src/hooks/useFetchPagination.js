import { useEffect, useState } from "react";
import { api, apiKey } from "../api/api";

export const useFetchPagination = ({url, dataType, onError}) => {
  const [data, setData] = useState(null);
  const [isLoading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(null);

  
	const changePage = page => {
		setCurrentPage(page);
	};

  useEffect(() => {
    setLoading(true);
    api
      .get(url + `?api_key=${apiKey}&language=en-US&page=${currentPage}`)
      .then((data) => {
        setTotalPages(data.total_pages);
        setData({ items: data.results, type: dataType });
      })
      .catch(() => {
        onError();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [currentPage]);

  return { data, isLoading, currentPage, totalPages, changePage };
};
