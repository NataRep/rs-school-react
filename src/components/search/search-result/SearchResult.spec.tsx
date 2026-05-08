import { fireEvent, render, screen } from "@testing-library/react";
import { ApiService } from "../../../services/api-service/api-service";
import SearchResult from "./SearchResult";

describe('SearchResult Component', () => {

  const mockSuccessData = {
    results: Array.from({ length: 9 }, (_, index) => ({
      name: `Character ${index}`,
      url: `https://swapi.dev/api/people/${index + 1}/`,
      gender: 'male',
      height: '172',
      mass: '77'
    })),
    count: 25,
    next: 'https://swapi.dev/api/people/?page=2',
    previous: null,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(ApiService, 'getData').mockResolvedValue(mockSuccessData);
  });


  it('should render items from api response', async () => {
    render(<SearchResult category="people" searchQuery="" />);

    const firstItem = await screen.findByText('Character 0');
    expect(firstItem).toBeInTheDocument();

    const resultItems = screen.getAllByText(/Character/i);
    expect(resultItems).toHaveLength(9);

    expect(screen.getByText('Character 8')).toBeInTheDocument();
  });

  it('should render user massage if data is empty', async () => {
    jest.spyOn(ApiService, 'getData').mockResolvedValue({
      results: [],
      count: 0,
      next: null,
      previous: null,
    });

    render(<SearchResult category="people" searchQuery="" />);

    expect(
      await screen.findByText(
        /Nothing found matching your request/i
      )
    ).toBeInTheDocument();

  });

  it('should change pages when click on pagination button', async () => {
    jest.spyOn(ApiService, 'getData').mockResolvedValue(mockSuccessData);

    render(<SearchResult category="people" searchQuery="" />);

    const nextBtn = await screen.findByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);

    await screen.findByText(/2 \/ 3/i);
  });

  it('should called ApiServer.get method with expected arguments', () => {

  });

  it('should reset current page when change category', async () => {
    jest.spyOn(ApiService, 'getData').mockResolvedValue(mockSuccessData);

    const { rerender } = render(<SearchResult category="people" searchQuery="" />);

    const nextBtn = await screen.findByRole('button', { name: /next/i });
    fireEvent.click(nextBtn);

    await screen.findByText(/2 \/ 3/i);

    rerender(<SearchResult category="planets" searchQuery="" />);

    await screen.findByText(/1 \/ 3/i);
  });
})