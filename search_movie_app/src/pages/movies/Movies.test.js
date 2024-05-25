import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Movies from "./Movies";

jest.mock("../../api/api");

afterEach(() => {
	jest.restoreAllMocks();
});

describe("Movies component", () => {
	test("renders loading spinner while fetching data", async () => {
		const mockData = {
			results: [
				{ id: 1, title: "Test 1" },
				{ id: 2, title: "Test 2" },
				{ id: 3, title: "Test 3" },
			],
			total_pages: 4,
		};

		require("../../api/api").api.get.mockResolvedValueOnce(mockData);

		render(
			<MemoryRouter>
				<Movies />
			</MemoryRouter>
		);

		const spinner = screen.getByTestId("loader");
		expect(spinner).toBeInTheDocument();

		await waitFor(() => {
			expect(screen.queryByTestId("loader")).toBeNull();
		});

		expect(
			await screen.findByText("Test 1", { selector: "p" })
		).toBeInTheDocument();
	});

	test("should show second page when next button clicked", async () => {
		const firstPageData = {
			results: [{ id: 1, title: "Test 1" }],
			total_pages: 2,
		};
		const secondPageData = {
			results: [{ id: 2, title: "Test 2" }],
			total_pages: 2,
		};

		require("../../api/api")
			.api.get.mockResolvedValueOnce(firstPageData)
			.mockResolvedValueOnce(secondPageData);

		render(
			<MemoryRouter>
				<Movies />
			</MemoryRouter>
		);

		await waitFor(() => {
			expect(screen.queryByTestId("loader")).toBeNull();
		});

		const nextButton = screen.getByTestId("next");
		userEvent.click(nextButton);

		await waitFor(() => {
			expect(screen.getByText("Test 2")).toBeInTheDocument();
		});

		expect(screen.queryByText("Test 2")).toBeInTheDocument();
	});
});
