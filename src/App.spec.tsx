import { render, screen } from "@testing-library/react";
import App from "./App";

describe('App component', () => {
  it('should render the main', async () => {
    render(<App />);

    const mainElement = await screen.findByRole('main', {}, { timeout: 3000 });
    expect(mainElement).toBeInTheDocument();
  })
});