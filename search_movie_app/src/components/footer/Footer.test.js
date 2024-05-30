import { render, screen } from "@testing-library/react";
import Footer from "./Footer";

test("Footer render properly", () => {
	render(<Footer />);
	const text = screen.getByText("https://github.com/linka351");

	expect(text).toBeInTheDocument();
});
