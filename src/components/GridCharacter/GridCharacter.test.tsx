import { render, screen } from "@testing-library/react";
import React from "react";
import '../../matchMedia.mock';
import { IGridCharacter } from "../../models";
import GridCharacter from "./GridCharacter";

const propsCrew: IGridCharacter = {
    character: {
        id: "12345",
        firstName: "testFirstName",
        lastName: "testLastName",
        name: "testFirstName testLastName",
        source: "testFirstName_testLastName",
        role: "test",
        isCreated: false,
        isCrewMember: true
    },
    view: 'crew'
}
const propsCaracter: IGridCharacter = {
    character: {
        id: "12345",
        firstName: "testFirstName",
        lastName: "testLastName",
        name: "testFirstName testLastName",
        source: "testFirstName_testLastName",
        isCrewMember: false,
    },
    view: 'characters'
}
describe("GridCharacter", () => {
    test("should render the component crew", () => {
        render(<GridCharacter character={propsCrew.character} view={propsCrew.view} />);
        const element = screen.getByText(/test/i, { exact: false })
        expect(element).toBeInTheDocument();
    });
    test("should render the name with crew member", () => {
        render(<GridCharacter character={propsCrew.character} view={propsCrew.view} />);
        const element = screen.getByText(/testFirstName/i, { exact: false })
        expect(element).toHaveTextContent('testFirstName')
    });
    test("should render the correct text button information", () => {
        render(<GridCharacter character={propsCrew.character} view={propsCrew.view} />);
        const element = screen.getByText(/information/i, { exact: false })
        expect(element).toHaveTextContent('information')
    });

    test("should render the component character", () => {
        render(<GridCharacter character={propsCaracter.character} view={propsCaracter.view} />);
        const element = screen.getByText(/test/i, { exact: false })
        expect(element).toBeInTheDocument();
    });
    test("should render the name with character member", () => {
        render(<GridCharacter character={propsCaracter.character} view={propsCaracter.view} />);
        const element = screen.getByText(/testFirstName/i, { exact: false })
        expect(element).toHaveTextContent('testFirstName')
    });
    test("should render the correct text button quote", () => {
        render(<GridCharacter character={propsCaracter.character} view={propsCaracter.view} />);
        const element = screen.getByText(/quotes/i, { exact: false })
        expect(element).toHaveTextContent('quotes')
    });
});