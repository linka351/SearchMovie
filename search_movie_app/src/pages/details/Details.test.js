import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import Details from "./Details";
import { useFavouritesContext } from "../../context/FavouritesContext";
import { api, IMG_URL } from "../../api/api";

jest.mock("../../context/FavouritesContext");
jest.mock("../../api/api");
jest.mock("react-router-dom", () => ({
	...jest.requireActual("react-router-dom"),
	useParams: jest.fn(),
	useNavigate: jest.fn(),
}));

describe("Details Component", () => {
	const mockAddFavourite = jest.fn();
	const mockRemoveFavourite = jest.fn();
	const mockNavigate = jest.fn();

	beforeEach(() => {
		useFavouritesContext.mockReturnValue({
			addFavourite: mockAddFavourite,
			removeFavourite: mockRemoveFavourite,
			favourites: [],
		});

		api.get.mockResolvedValue({
			title: "Sample Movie",
			release_date: "2022-05-20",
			backdrop_path: "/sample.jpg",
			vote_average: 8.5,
			overview: "This is a sample movie.",
		});

		require("react-router-dom").useNavigate.mockReturnValue(mockNavigate);

		require("react-router-dom").useParams.mockReturnValue({
			id: "1",
			type: "movie",
		});
	});

	afterEach(() => {
		jest.clearAllMocks();
	});

	test("renders correctly with fetched data", async () => {
		render(
			<MemoryRouter initialEntries={["/details/movie/1"]}>
				<Routes>
					<Route path='/details/:type/:id' element={<Details />} />
				</Routes>
			</MemoryRouter>
		);

		expect(await screen.findByText("Sample Movie")).toBeInTheDocument();

		expect(screen.getByText("This is a sample movie.")).toBeInTheDocument();
		expect(screen.getByText("2022")).toBeInTheDocument();
		expect(screen.getByText("8.5")).toBeInTheDocument();
		expect(screen.getByRole("img", { name: "Sample Movie" })).toHaveAttribute(
			"src",
			`${IMG_URL}/sample.jpg`
		);
	});

	test("navigates back when the back button is clicked", async () => {
		render(
			<MemoryRouter initialEntries={["/details/movie/1"]}>
				<Routes>
					<Route path='/details/:type/:id' element={<Details />} />
				</Routes>
			</MemoryRouter>
		);

		const backButton = screen.getByRole("button", { name: "" });
		await userEvent.click(backButton);

		expect(mockNavigate).toHaveBeenCalledWith(-1);
	});

	test("adds to favourites when the favourite button is clicked", async () => {
		render(
			<MemoryRouter initialEntries={["/details/movie/1"]}>
				<Routes>
					<Route path='/details/:type/:id' element={<Details />} />
				</Routes>
			</MemoryRouter>
		);

		expect(await screen.findByText("Sample Movie")).toBeInTheDocument();

		const favouriteButton = screen.getByRole("button", { name: "favourites" });
		await userEvent.click(favouriteButton);

		expect(mockAddFavourite).toHaveBeenCalledWith({
			title: "Sample Movie",
			backdrop_path: "/sample.jpg",
			type: "movie",
			id: "1",
		});
	});
});
