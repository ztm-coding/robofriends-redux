import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import CardList from "./CardList";

// Mock data
const mockRobots = [
    { id: 1, name: "John Doe", email: "john@example.com" },
    { id: 2, name: "Jane Doe", email: "jane@example.com" },
];

describe("CardList Component", () => {
    test("renders the correct number of Card components", () => {
        const { asFragment } = render(<CardList robots={mockRobots} />);
        // Get all Card components by the test ID
        const cards = screen.getAllByTestId("card-component");

        // Assert that the number of rendered cards matches the length of mockRobots
        expect(cards).toHaveLength(mockRobots.length);
        expect(asFragment()).toMatchSnapshot();
    });

    test("displays the correct names and emails", () => {
        const { asFragment } = render(<CardList robots={mockRobots} />);

        // Check if each robot's name and email is displayed
        mockRobots.forEach((robot) => {
            expect(screen.getByText(robot.name)).toBeInTheDocument();
            expect(screen.getByText(robot.email)).toBeInTheDocument();
        });
        expect(asFragment()).toMatchSnapshot();
    });

    test("renders nothing when robots array is empty", () => {
        const { asFragment } = render(<CardList robots={[]} />);

        // There should be no Card components when the array is empty
        expect(screen.queryByTestId("card-component")).not.toBeInTheDocument();
        expect(asFragment()).toMatchSnapshot();
    });
});
