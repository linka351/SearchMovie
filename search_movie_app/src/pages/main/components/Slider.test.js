import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import Slider from "./Slider";

describe("Slider component", () => {
	test("renders loading spinner while fetching data", async () => {
		render(<Slider />);
		const spinner = screen.getByTestId("loader");
		expect(spinner).toBeInTheDocument();
		await waitFor(() => {
			expect(spinner).toBeInTheDocument();
		});
	});
});
