import React from "react";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import Card from "./Card";

test("Card Component matches the snapshot", () => {
    const { asFragment } = render(
        <Card name="John Doe" email="john@example.com" id="123" />
    );

    // Check if name, email, and image are rendered correctly
    expect(screen.getByText("John Doe")).toBeInTheDocument();
    expect(screen.getByText("john@example.com")).toBeInTheDocument();
    expect(screen.getByAltText("robots")).toHaveAttribute(
        "src",
        "https://robohash.org/123?size=200x200"
    );

    // Snapshot test
    expect(asFragment()).toMatchSnapshot(); // Use asFragment() for snapshot testing
});

// Test for handling missing props (id, name, email)
test("Card component handles missing props gracefully", () => {
    const { asFragment } = render(<Card />); // No props passed

    // Test that the name and email are not rendered if they don't exist
    expect(screen.queryByText(/name/i)).toBeNull();
    expect(screen.queryByText(/email/i)).toBeNull();

    // Snapshot test
    expect(asFragment()).toMatchSnapshot();
});

// Test if the fallback image is used when id is missing
test("Card component renders fallback image when no id is passed", () => {
    render(<Card name="Jane Doe" email="jane@example.com" />);

    // Test that the image src includes "undefined" for the missing id
    expect(screen.getByAltText("robots")).toHaveAttribute(
        "src",
        "https://robohash.org/undefined?size=200x200"
    );
});
