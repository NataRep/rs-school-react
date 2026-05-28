import { render, screen } from "@testing-library/react";
import Icon from "./Icon";

describe('Icon component', () => {
  it('should render the icon after loading', async () => {
    render(<Icon name="search" />);

    const icon = await screen.findByTestId('svg-icon');

    expect(icon).toBeInTheDocument();
  });

})