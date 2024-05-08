import React from "react";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Favourites from "./Favourites";

describe("Favourites component", () => {
	test("renders Favourites component with favourites", () => {
		const mockFavourites = [
			{ id: 1, type: "movie", backdrop_path: "/image1.jpg", title: "Movie 1" },
			{ id: 2, type: "tv", backdrop_path: "/image2.jpg", name: "TV Show 1" },
		];

		localStorage.setItem("favouriteArray", JSON.stringify(mockFavourites));

		const { getByText, getAllByRole } = render(
			<MemoryRouter>
				<Favourites />
			</MemoryRouter>
		);

		expect(getByText("Movie 1")).toBeInTheDocument();
		expect(getByText("TV Show 1")).toBeInTheDocument();

		const links = getAllByRole("link");
		expect(links).toHaveLength(2);
		expect(links[0]).toHaveAttribute("href", "/details/movie/1");
		expect(links[1]).toHaveAttribute("href", "/details/tv/2");
	});

	test("renders no-favourites message when no favourites are present", () => {
		localStorage.removeItem("favouriteArray");

		const { getByText } = render(
			<MemoryRouter>
				<Favourites />
			</MemoryRouter>
		);

		expect(
			getByText("Brak ulubionych pozycji, proszę dodać film lub serial")
		).toBeInTheDocument();
	});
});
