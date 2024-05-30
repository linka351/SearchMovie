import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Slider from "./Slider";
import { api } from "../../../api/api";
import { MemoryRouter } from "react-router-dom";
import userEvent from "@testing-library/user-event";

beforeEach(() => {
	jest.spyOn(api, "get").mockImplementation(() =>
		Promise.resolve({
			results: [
				{
					id: 1,
					title: "test",
					overview: "test",
				},
				{
					id: 2,
					title: "test2",
					overview: "test3",
				},
				{
					id: 3,
					title: "test3",
					overview: "test3",
				},
			],
		})
	);
});

afterEach(() => {
	jest.restoreAllMocks();
});

describe("Slider component", () => {
	test("renders loading spinner while fetching data", async () => {
		render(
			<MemoryRouter>
				<Slider />
			</MemoryRouter>
		);
		const spinner = screen.getByTestId("loader");
		expect(spinner).toBeInTheDocument();

		const slide = await screen.findByText("test", { selector: "h2" });
		expect(slide).toBeInTheDocument();
	});

	test("should show second slide when next button clicked", async () => {
		render(
			<MemoryRouter>
				<Slider />
			</MemoryRouter>
		);

		const nextButton = await screen.findByRole("button");
		await userEvent.click(nextButton);
		const slide = await screen.findByText("test2", { selector: "h2" });
		expect(slide).toBeInTheDocument();
	});
});
