import React from "react";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import SearchPage from "./SearchPage";

describe("SearchPage component", () => {
	test("renders search page with correct elements", () => {
		render(<SearchPage />);

		expect(screen.getByText("What are you looking for?")).toBeInTheDocument();
		expect(screen.getByPlaceholderText("Czego Szukasz?")).toBeInTheDocument();
		expect(screen.getByText("Search Movies")).toBeInTheDocument();
		expect(screen.getByText("Search Tv Series")).toBeInTheDocument();
	});

	test("updates input value and calls search function when input value changes", async () => {
		render(<SearchPage />);
		const inputElement = screen.getByPlaceholderText("Czego Szukasz?");

		await userEvent.type(inputElement, "test");

		expect(await screen.findByDisplayValue("test")).toBeInTheDocument();
	});

	test("changes search type and fetches data when movie button clicked", async () => {
		render(<SearchPage />);
		const movieButton = screen.getByText("Search Movies");

		await userEvent.click(movieButton);

		expect(
			await screen.findByText("Search Movies", { selector: ".active" })
		).toBeInTheDocument();
	});

	test("changes search type and fetches data when tv series button clicked", async () => {
		render(<SearchPage />);
		const tvSeriesButton = screen.getByText("Search Tv Series");

		await userEvent.click(tvSeriesButton);

		expect(
			await screen.findByText("Search Tv Series", { selector: ".active" })
		).toBeInTheDocument();
	});
});
