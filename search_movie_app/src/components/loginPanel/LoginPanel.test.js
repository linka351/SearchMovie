import { render, screen } from "@testing-library/react";
import LoginPanel from "./LoginPanel";
import userEvent from "@testing-library/user-event";

test("LoginPanel render properly", () => {
	render(<LoginPanel />);
	const text = screen.getByText("Podaj swoją nazwę aby się zalogować");
	expect(text).toBeInTheDocument();
});

test("input change properly", async () => {
	render(<LoginPanel />);
	const input = screen.getByRole("textbox");

	await userEvent.type(input, "admin");

	expect(input).toHaveValue("admin");
});

test("should show error when input is empty", async () => {
	render(<LoginPanel />);
	const button = screen.getByRole("button");
	await button.click();

	const error = await screen.findByText("Proszę podać nazwę użytkownika!");

	expect(error).toBeInTheDocument();
});
