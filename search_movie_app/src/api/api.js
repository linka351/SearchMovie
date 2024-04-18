export const apiKey = process.env.REACT_APP_IMAGE_API_KEY;
export const IMG_URL = "https://image.tmdb.org/t/p/w500/";
export const Base_URL = "https://api.themoviedb.org/3";

export const endpoints = {
	movie: Base_URL + "/movie",
	series: Base_URL + "/tv",
	searchPage: Base_URL + "/search",
	slider: Base_URL + "/trending",
	details: Base_URL,
};

const get = async url => {
	const response = await fetch(url);
	if (response.ok) {
		return response.json();
	}
	throw new Error(response.status);
};

const api = { get };

export { api };
