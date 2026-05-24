import { render, screen } from "@testing-library/react";

import { act } from "react";
import { createMemoryRouter, RouterProvider } from "react-router-dom";
import { ApiService } from "../../../services/api-service/api-service";
import type { RootState } from "../../../store";
import SearchResult from "./SearchResult";
import { searchResultLoader } from "./searchLoader"; // Импортируй свой лоадер

jest.mock("../../../services/api-service/api-service");


jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');

  return {
    ...actual,
    useDispatch: () => jest.fn(),
    useSelector: (selector: (state: RootState) => unknown) =>
      selector({
        selected: {
          items: [],
        },
      } as RootState),
  };
});

describe('SearchResult Component', () => {
  let consoleSpy: jest.SpyInstance;

  beforeAll(() => {
    consoleSpy = jest.spyOn(console, 'warn').mockImplementation((msg) => {
      if (msg && typeof msg === 'string' && msg.includes('HydrateFallback')) return;
      console.log('Original Warn:', msg);
    });
  });

  afterAll(() => {
    consoleSpy.mockRestore();
  });

  const mockSuccessData = {
    results: Array.from({ length: 9 }, (_, index) => ({
      name: `Character ${index}`,
      url: `https://swapi.dev/api/people/${index + 1}/`,
    })),
    count: 25,
  };

  const renderWithRouter = (initialPath = "/people") => {
    const routes = [
      {
        path: "/:categoryName",
        element: <SearchResult />,
        loader: searchResultLoader,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [initialPath],
      future: {
        v7_relativeSplatPath: true,
        v7_fetcherPersist: true,
        v7_normalizeFormMethod: true,
        v7_partialHydration: true,
        v7_skipActionErrorRevalidation: true,
      },
    });
    return render(<RouterProvider router={router} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (ApiService.getData as jest.Mock).mockResolvedValue(mockSuccessData);
  });

  it('should render items from api response', async () => {
    await act(async () => {
      renderWithRouter("/people");
    });

    expect(await screen.findByText(/Character 0/i)).toBeInTheDocument();

    const resultItems = screen.getAllByText(/Character/i);
    expect(resultItems).toHaveLength(9);
  });

  it('should render user message if data is empty', async () => {
    (ApiService.getData as jest.Mock).mockResolvedValue({
      results: [],
      count: 0,
    });

    await act(async () => {
      renderWithRouter("/people");
    });

    expect(
      await screen.findByText(/Nothing found matching your request/i)
    ).toBeInTheDocument();
  });

  it('should reflect page change from URL', async () => {
    renderWithRouter("/people?page=2");

    expect(await screen.findByText(/2 \/ 3/i)).toBeInTheDocument();
  });
});