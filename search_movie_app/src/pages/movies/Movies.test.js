import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

import Movies from "./Movies";

// // Mockowanie modułu api
// jest.mock("../../api/api", () => ({
// 	api: {
// 		get: jest.fn(),
// 	},
// 	apiKey: "your_api_key", // Dodaj odpowiednie dane, jeśli są potrzebne
// 	endpoints: {
// 		movie: "your_movie_endpoint", // Dodaj odpowiedni endpoint
// 	},
// }));

afterEach(() => {
	jest.restoreAllMocks();
});

describe("Movies component", () => {
	test("renders loading spinner while fetching data", async () => {
		// Symulacja danych z serwera
		const mockData = {
			results: [],
			total_pages: 10,
		};

		// Ustawienie mockowanej odpowiedzi dla funkcji api.get
		require("../../api/api").api.get.mockResolvedValueOnce({ data: mockData });

		render(<Movies />);

		const spinner = screen.getByTestId("loader");
		expect(spinner).toBeInTheDocument();

		// Oczekiwanie na zniknięcie spinnera
		await waitFor(() => {
			expect(screen.queryByTestId("loader")).toBeNull();
		});

		// Sprawdzenie, czy komponent ItemGrid jest renderowany po zakończeniu ładowania
		expect(screen.getByTestId("item-grid")).toBeInTheDocument();
	});

	test("should show second page when next button clicked", async () => {
		// Symulacja danych z serwera
		const firstPageData = {
			results: [{ id: 1, title: "Test 1" }],
			total_pages: 2,
		};
		const secondPageData = {
			results: [{ id: 2, title: "Test 2" }],
			total_pages: 2,
		};

		// Ustawienie mockowanych odpowiedzi dla funkcji api.get
		require("../../api/api")
			.api.get.mockResolvedValueOnce({ data: firstPageData })
			.mockResolvedValueOnce({ data: secondPageData });

		render(<Movies />);

		// Oczekiwanie na załadowanie danych
		await waitFor(() => {
			expect(screen.queryByTestId("loader")).toBeNull();
		});

		// Kliknięcie na przycisk "next"
		const nextButton = screen.getByText("Next");
		userEvent.click(nextButton);

		// Oczekiwanie na ponowne załadowanie danych po zmianie strony
		await waitFor(() => {
			expect(screen.getByText("Test 2")).toBeInTheDocument();
		});

		// Sprawdzenie, czy komponent wyświetla dane z drugiej strony
		expect(screen.queryByText("Test 2")).toBeInTheDocument();
	});
});
