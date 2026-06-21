import { render } from '@testing-library/react';
import Icon from './Icon';

describe('Icon component', () => {
  it('should render the icon correctly', () => {
    const { container } = render(<Icon name="search" />);

    const iconSpan = container.querySelector('.icon');
    expect(iconSpan).toBeInTheDocument();

    expect(iconSpan).toHaveStyle('mask-image: url(/mocked-path-to-asset.svg)');
  });
});
