import { render, screen } from "./test-utils"; // Оновлений імпорт
import { IssueCard } from "../components/IssueCard";

const mockIssue = {
  id: 1,
  title: "Fix button styling",
  number: 315,
  created_at: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
  user: { login: "testuser" },
  comments: 5,
  state: "open" as const,
  assignee: null,
};

describe("IssueCard", () => {
  it("renders issue title, number, date, user, and comments", () => {
    render(<IssueCard issue={mockIssue} columnId="todo" />);
    expect(screen.getByText("Fix button styling")).toBeInTheDocument();
    expect(screen.getByText(/#315 opened 3 days ago/i)).toBeInTheDocument();
    expect(screen.getByText("🧑 testuser")).toBeInTheDocument();
    expect(screen.getByText("💬 Comments: 5")).toBeInTheDocument();
  });
});