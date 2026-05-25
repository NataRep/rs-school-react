import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useDispatch, useSelector } from "react-redux";
import type { Person, Planet } from "../../../services/api-service/api-models";
import { clearSelected } from "../../../store/selectedSlice";
import { handleDownload } from "../../../utils/handlerDownload";
import { SelectedItemsFlyout } from "./SelectedItemsFlyout";

jest.mock("react-redux", () => ({
  useDispatch: jest.fn(),
  useSelector: jest.fn(),
}));

jest.mock("../../../utils/handlerDownload", () => ({
  handleDownload: jest.fn(),
}));

jest.mock("../../../store/selectedSlice", () => ({
  clearSelected: jest.fn(() => ({ type: "selected/clearSelected" })),
}));

describe('SelectedItemsFlyout component', () => {
  let mockDispatch: jest.Mock;

  const mockPerson: Person = {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/1/',
  } as Person;

  const mockPlanet: Planet = {
    name: 'Tatooine',
    terrain: 'desert',
    climate: 'arid',
    url: 'https://swapi.dev/api/planets/2/',
  } as Planet;

  const mockData = [mockPerson, mockPlanet]

  beforeEach(() => {
    mockDispatch = jest.fn();
    ((useDispatch as unknown as jest.Mock).mockReturnValue(mockDispatch)).mockReturnValue(mockDispatch);
  });

  afterEach(() => jest.clearAllMocks())

  it('should not render flyout if no items are selected', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([]);

    const { container } = render(<SelectedItemsFlyout />);

    expect(container.firstChild).toBeNull();
  });

  it('should render flyout with buttons', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue([mockData]);

    render(<SelectedItemsFlyout />);

    expect(screen.getByText('Selected items:')).toBeInTheDocument();
    expect(screen.getByText('Download')).toBeInTheDocument();
    expect(screen.getByText('Unselect all')).toBeInTheDocument();
  });


  it('should display current count for selected items', () => {
    (useSelector as unknown as jest.Mock).mockReturnValue(mockData);

    render(<SelectedItemsFlyout />);

    const countSpan = screen.getByText('Selected items:');
    expect(countSpan.parentElement).toHaveTextContent(`Selected items: ${mockData.length}`);
  });

  it('should call handleDownload with argument when button Download is clicked ', async () => {

    (useSelector as unknown as jest.Mock).mockReturnValue(mockData);

    render(<SelectedItemsFlyout />);

    const buttonDownload = screen.getByText('Download');

    await userEvent.click(buttonDownload);

    expect(handleDownload).toHaveBeenCalledTimes(1);
    expect(handleDownload).toHaveBeenCalledWith(mockData);
  });

  it('should call clearHandler when button Unselect all is clicked ', async () => {

    (useSelector as unknown as jest.Mock).mockReturnValue(mockData);

    render(<SelectedItemsFlyout />);

    const buttonUnselect = screen.getByText('Unselect all');

    await userEvent.click(buttonUnselect);

    expect(clearSelected).toHaveBeenCalledTimes(1);

  });
})