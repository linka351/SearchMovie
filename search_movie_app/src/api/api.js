export const apiKey = process.env.REACT_APP_IMAGE_API_KEY;
export const IMG_URL = "https://image.tmdb.org/t/p/w500/";
const BASE_URL = "https://api.themoviedb.org/3";

export const endpoints = {
    movie: BASE_URL + "/movie",
}

const get = async (url) => {
  const response = await fetch(url);
  if (response.ok) {
    return response.json();
  }
  throw new Error(response.status);
};

const api = {get}

export { api };