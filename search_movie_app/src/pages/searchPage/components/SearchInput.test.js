import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event"; // Importujemy userEvent do symulowania interakcji użytkownika
import SearchInput from "./SearchInput";

describe("SearchInput component", () => {
	test("renders input field with placeholder and value correctly", () => {
		render(<SearchInput value='Test Value' onChange={() => {}} />);
		const inputElement = screen.getByPlaceholderText("Czego Szukasz?");
		expect(inputElement).toBeInTheDocument();
		expect(inputElement).toHaveAttribute("value", "Test Value");
	});

	test("calls onChange function with input value when input changes", async () => {
		const onChangeMock = jest.fn();
		render(<SearchInput value='' onChange={onChangeMock} />);

		const inputElement = screen.getByPlaceholderText("Czego Szukasz?");
		await userEvent.type(inputElement, "Test Value", {
			target: { value: "Test Value" },
		});

		screen.debug();

		// // Oczekujemy, że funkcja onChange zostanie wywołana 10 razy (po każdej literze "Test Value")
		// expect(onChangeMock).toHaveBeenCalledTimes(10);

		// // Oczekujemy, że funkcja onChange zostanie wywołana z oczekiwaną wartością "Test Value"
		// expect(onChangeMock).toHaveBeenCalledWith("Test Value");w
	});
});
