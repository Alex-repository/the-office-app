import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import '../../matchMedia.mock';
import SearchOption from "./SearchOption";

const onSearchOrder = jest.fn();

describe("GridCharacter", () => {
    test("should render the component SearchOption", () => {
        render(<SearchOption onSearchOrder={onSearchOrder} />);
        const element = screen.getByText(/First Name/i, { exact: false })
        expect(element).toBeInTheDocument();
    });
    test("should render the component after change option", () => {
        render(<SearchOption onSearchOrder={onSearchOrder} />);
        fireEvent.change(screen.getByTestId("selectOption"), {
            target: { value: "lastName" },
          });
        expect(screen.getByTestId("selectOption")).toBeInTheDocument();
    });
});