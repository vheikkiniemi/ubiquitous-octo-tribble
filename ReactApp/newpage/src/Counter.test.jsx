import { render, screen, fireEvent } from "@testing-library/react";
import Counter from "./components/Counter.jsx";
import { describe, it, expect } from "vitest"; // 🟢 Oikea tuonti

describe("Counter component", () => {
  it("näyttää oikean alkulukeman", () => {
    render(<Counter />);
    expect(screen.getByText("Count: 0")).toBeInTheDocument();
  });

  it("kasvattaa lukemaa, kun nappia painetaan", () => {
    render(<Counter />);
    const button = screen.getByRole("button", { name: "Increase" });
    fireEvent.click(button);
    expect(screen.getByText("Count: 1")).toBeInTheDocument();
  });
});
