import { render, screen } from "./test-utils";
import { RepositoryInfo } from "../components/RepositoryInfo";

describe("RepositoryInfo", () => {
  it("renders owner, name, and stars", () => {
    render(<RepositoryInfo owner="facebook" name="react" stars={12345} />);
    expect(screen.getByText("facebook")).toBeInTheDocument();
    expect(screen.getByText("react")).toBeInTheDocument();
    expect(screen.getByText("⭐ 12345 stars")).toBeInTheDocument();
  });
});