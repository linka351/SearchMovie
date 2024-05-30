import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";
import ItemGrid from "./ItemGrid";

const mockData = {
	items: [
		{ id: 1, backdrop_path: "/example1.jpg", title: "Example Movie 1" },
		{ id: 2, backdrop_path: "/example2.jpg", title: "Example Movie 2" },
	],
	type: "movies",
};
const mockInitialPage = 1;
const mockTotalPages = 2;
const mockChangePage = jest.fn();
const mockIsLoading = false;

test("renders correct data when loaded", () => {
	render(
		<MemoryRouter>
			<ItemGrid
				data={mockData}
				initialPage={mockInitialPage}
				totalPages={mockTotalPages}
				changePage={mockChangePage}
				isLoading={mockIsLoading}
			/>
		</MemoryRouter>
	);
	const movieElements = screen.getAllByRole("link");
	expect(movieElements).toHaveLength(mockData.items.length);
});

test("handles pagination correctly", async () => {
	render(
		<MemoryRouter>
			<ItemGrid
				data={mockData}
				initialPage={mockInitialPage}
				totalPages={mockTotalPages}
				changePage={mockChangePage}
				isLoading={mockIsLoading}
			/>
		</MemoryRouter>
	);
	const nextPageButton = screen.getByText("Next");
	await userEvent.click(nextPageButton);
	const paginationLabel = await screen.findByText(
		`${mockInitialPage + 1}/${mockTotalPages}`
	);
	expect(paginationLabel).toBeInTheDocument();
});

test("renders 'Podaj Film z bazy danych' when no items", () => {
	render(
		<MemoryRouter>
			<ItemGrid
				data={{ items: [], type: "movies" }}
				initialPage={mockInitialPage}
				totalPages={mockTotalPages}
				changePage={mockChangePage}
				isLoading={mockIsLoading}
			/>
		</MemoryRouter>
	);
	const messageElement = screen.getByText("Podaj Film z bazy danych");
	expect(messageElement).toBeInTheDocument();
});
