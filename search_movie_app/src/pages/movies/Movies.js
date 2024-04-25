import { ToastContainer, toast } from "react-toastify";

import ItemGrid from "../../components/itemGrid/ItemGrid";

import { endpoints } from "../../api/api";
import { dataType } from "../../utils/data.const";
import { useFetchPagination } from "../../hooks/useFetchPagination";

import "react-toastify/dist/ReactToastify.css";

function Movies() {
  const url = endpoints.movie + '/top_rated';

  const showToastMessage = () => {
    toast.error("Failed to fetch", {
      position: "top-right",
    });
  };

  const { changePage, currentPage, data, isLoading, totalPages } = useFetchPagination({
    url,
    dataType,
    onError: showToastMessage,
  });

;
  return (
    <>
      <ItemGrid
        data={data}
        initialPage={currentPage}
        totalPages={totalPages}
        changePage={changePage}
        isLoading={isLoading}
      />
      <ToastContainer />
    </>
  );
}

export default Movies;
