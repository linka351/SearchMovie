import { useEffect } from "react";

const useDebounce = ({ callback, delay, dependecies }) => {
	useEffect(() => {
		const timeoutId = setTimeout(callback, delay);

		return () => {
			if (timeoutId) {
				clearTimeout(timeoutId);
			}
		};
	}, dependecies);
};

export default useDebounce;
