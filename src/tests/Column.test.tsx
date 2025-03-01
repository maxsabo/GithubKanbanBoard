import { render, screen } from "./test-utils";
import { Column } from "../components/Column";

const mockIssues = [
  {
    id: 1,
    title: "Issue 1",
    number: 1,
    created_at: "2023-01-01",
    user: { login: "user1" },
    comments: 2,
    state: "open" as const,
    assignee: null,
  },
];

describe("Column", () => {
  it("renders issues correctly", () => {
    render(<Column issues={mockIssues} id="todo" />);
    expect(screen.getByText("Issue 1")).toBeInTheDocument();
  });
});