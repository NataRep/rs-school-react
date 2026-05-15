import { render, screen } from "@testing-library/react";
import Main from "./Main";

jest.mock('../search/Search', () => {
  return function MockSearch() {
    return <div data-testid="search-mock">Star Wars Universe Search</div>;
  };
});

describe('Main component', () => {
  it('should render the main', async () => {
    render(<Main />);

    const mainElement = await screen.findByRole('main', {}, { timeout: 1000 });
    expect(mainElement).toBeInTheDocument();
  })
})