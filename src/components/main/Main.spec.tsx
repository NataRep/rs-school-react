import { render, screen } from "@testing-library/react";
import Main from "./Main";

jest.mock('../search/Search', () => {
  return function MockSearch() {
    return <div data-testid="search-mock">Star Wars Universe Search</div>;
  };
});

describe('Main component', () => {
  it('should render the search', () => {
    render(<Main />);
    expect(screen.getByText(/Star Wars Universe Search/i)).toBeInTheDocument();
  })
})