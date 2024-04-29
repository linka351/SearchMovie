import { toast } from "react-toastify";

export const showToastMessage = () => {
	toast.error("Failed to fetch", {
		position: "top-right",
	});
};
