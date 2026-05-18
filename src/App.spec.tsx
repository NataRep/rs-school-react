import { render, screen, waitFor } from "@testing-library/react";
import App from "./App";
import { ApiService } from "./services/api-service/api-service"; // Проверьте правильность пути до ApiService

jest.mock("./services/api-service/api-service", () => ({
  ApiService: {
    getData: jest.fn()
  }
}));

describe('App component', () => {
  beforeEach(() => {
    (ApiService.getData as jest.Mock).mockResolvedValue({
      results: [
        { url: "https://swapi.dev/api/people/1/", name: "Luke Skywalker" }
      ],
      count: 1
    });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  it('should render the main', async () => {
    render(<App />);

    await waitFor(() => {
      const mainElement = screen.getByRole('main');
      expect(mainElement).toBeInTheDocument();
    }, { timeout: 3000 });
  });
});