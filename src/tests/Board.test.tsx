import { render, screen } from "./test-utils";
import { Board } from "../components/Board";

describe("Board", () => {
  it("renders columns with titles", () => {
    render(<Board />);
    expect(screen.getByText("ToDo 🔥")).toBeInTheDocument();
    expect(screen.getByText("In Progress ⏳")).toBeInTheDocument();
    expect(screen.getByText("Done ✅")).toBeInTheDocument();
  });
});