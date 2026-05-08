import { render, screen } from "@testing-library/react";
import { act } from "react";
import App from "./App";

jest.mock("./components/search/search-result/SearchResult", () => {
  return function MockSearchResult() {
    return <div data-testid="mock-search-result">SearchResult Loaded</div>;
  };
});

describe('App component', () => {
  it('should render the main', async () => {
    await act(async () => {
      render(<App />);
    });

    expect(screen.getByRole('main')).toBeInTheDocument();
    expect(screen.getByText(/Star Wars Universe Search/i)).toBeInTheDocument();
  });
});