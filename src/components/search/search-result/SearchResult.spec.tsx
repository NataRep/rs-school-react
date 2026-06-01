import { render, screen, waitFor } from "@testing-library/react";
import {
  createMemoryRouter,
  RouterProvider,
  useRouteError,
} from "react-router-dom";

import { useGetDataQuery } from "../../../store/starWarsApi";
import SearchResult from "./SearchResult";

jest.mock("../../../store/starWarsApi", () => ({
  useGetDataQuery: jest.fn(),
}));

jest.mock("../search-result-item/SearchResultItem", () => ({
  __esModule: true,
  default: ({ item }: { item: { name?: string; title?: string } }) => (
    <div>{item.name || item.title}</div>
  ),
}));

jest.mock("../search-pagination/SearchPagination", () => ({
  __esModule: true,
  default: ({ totalPages }: { totalPages: number }) => (
    <div>{`Pagination ${totalPages}`}</div>
  ),
}));

jest.mock("../../shared/loader/Loader", () => ({
  __esModule: true,
  default: () => <div>Loading...</div>,
}));

function TestErrorBoundary() {
  const error = useRouteError();

  if (error instanceof Response) {
    return (
      <div>
        Error: {error.status} {error.statusText}
      </div>
    );
  }

  return <div>Unknown error</div>;
}

describe("SearchResult Component", () => {
  const mockedUseGetDataQuery = useGetDataQuery as jest.Mock;

  const mockSuccessData = {
    results: Array.from({ length: 9 }, (_, index) => ({
      name: `Character ${index}`,
      url: `https://swapi.dev/api/people/${index + 1}/`,
    })),
    count: 25,
  };

  const renderWithRouter = (
    initialPath = "/search/people",
    loaderData = {
      searchQuery: "",
      currentPage: 1,
      categoryName: "people",
    }
  ) => {
    const routes = [
      {
        path: "/search/:categoryName",
        element: <SearchResult />,
        errorElement: <TestErrorBoundary />,
        loader: async () => loaderData,
      },
    ];

    const router = createMemoryRouter(routes, {
      initialEntries: [initialPath],
    });

    return render(<RouterProvider router={router} />);
  };

  beforeEach(() => {
    jest.clearAllMocks();

    mockedUseGetDataQuery.mockReturnValue({
      data: mockSuccessData,
      isLoading: false,
      isError: false,
      error: undefined,
    });
  });

  it("should render items from api response", async () => {
    renderWithRouter();

    expect(await screen.findByText(/Character 0/i)).toBeInTheDocument();

    const resultItems = screen.getAllByText(/Character/i);

    expect(resultItems).toHaveLength(9);
  });

  it("should render user message if data is empty", async () => {
    mockedUseGetDataQuery.mockReturnValue({
      data: {
        results: [],
        count: 0,
      },
      isLoading: false,
      isError: false,
      error: undefined,
    });

    renderWithRouter();

    expect(
      await screen.findByText(/Nothing found matching your request/i)
    ).toBeInTheDocument();
  });

  it("should render loader while loading", async () => {
    mockedUseGetDataQuery.mockReturnValue({
      data: undefined,
      isLoading: true,
      isError: false,
      error: undefined,
    });

    renderWithRouter();

    expect(await screen.findByText(/Loading/i)).toBeInTheDocument();
  });

  it("should render error message", async () => {
    mockedUseGetDataQuery.mockReturnValue({
      data: undefined,
      isLoading: false,
      isError: true,
      error: {
        status: 500,
      },
    });

    renderWithRouter();

    expect(
      await screen.findByText(
        /Something went wrong. Please try again later/i
      )
    ).toBeInTheDocument();
  });

  it("should render correct pagination count", async () => {
    renderWithRouter("/search/people?page=2", {
      searchQuery: "",
      currentPage: 2,
      categoryName: "people",
    });

    expect(await screen.findByText(/Pagination 3/i)).toBeInTheDocument();
  });

  it("should call query hook with correct params", async () => {
    renderWithRouter("/search/starships?page=3", {
      searchQuery: "falcon",
      currentPage: 3,
      categoryName: "starships",
    });

    await waitFor(() => {
      expect(mockedUseGetDataQuery).toHaveBeenCalledWith({
        category: "starships",
        searchQuery: "falcon",
        page: 3,
      });
    });
  });
});