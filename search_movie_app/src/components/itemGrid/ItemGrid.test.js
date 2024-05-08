import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
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
		<BrowserRouter>
			<ItemGrid
				data={mockData}
				initialPage={mockInitialPage}
				totalPages={mockTotalPages}
				changePage={mockChangePage}
				isLoading={mockIsLoading}
			/>
		</BrowserRouter>
	);
	const movieElements = screen.getAllByRole("link");
	expect(movieElements).toHaveLength(mockData.items.length);
});

// test("handles pagination correctly", async () => {
// 	render(
// 		<BrowserRouter>
// 			<ItemGrid
// 				data={mockData}
// 				initialPage={mockInitialPage}
// 				totalPages={mockTotalPages}
// 				changePage={mockChangePage}
// 				isLoading={mockIsLoading}
// 			/>
// 		</BrowserRouter>
// 	);
// 	const nextPageButton = screen.getByText("Next");
// 	await fireEvent.click(nextPageButton);

// 	expect(mockChangePage).toHaveBeenCalledWith(mockInitialPage + 1);
// });

test("renders 'Podaj Film z bazy danych' when no items", () => {
	render(
		<ItemGrid
			data={{ items: [], type: "movies" }}
			initialPage={mockInitialPage}
			totalPages={mockTotalPages}
			changePage={mockChangePage}
			isLoading={mockIsLoading}
		/>
	);
	const messageElement = screen.getByText("Podaj Film z bazy danych");
	expect(messageElement).toBeInTheDocument();
});
