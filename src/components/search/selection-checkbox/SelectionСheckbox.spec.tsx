import { fireEvent, render, screen } from '@testing-library/react';
import type { RootState } from '../../../store';
import type { Person } from '../../../store/api-models';
import { toggleSelected } from '../../../store/selectedSlice';
import { starWarsApi } from '../../../store/starWarsApi';
import type { SearchItem } from '../search-result-item/SearchResultItem';
import SelectionCheckbox from './SelectionСheckbox';

const mockDispatch = jest.fn();
let mockSelectedItems: SearchItem[] = [];

jest.mock('react-redux', () => {
  const actual = jest.requireActual('react-redux');

  return {
    ...actual,
    useDispatch: () => mockDispatch,
    useSelector: <TSelected,>(
      selector: (state: RootState) => TSelected,
    ): TSelected =>
      selector({
        selected: {
          items: mockSelectedItems,
        },
        [starWarsApi.reducerPath]: starWarsApi.reducer(undefined, {
          type: '@@INIT',
        }),
      } as RootState),
  };
});

jest.mock('../../../store/selectedSlice', () => {
  const actual = jest.requireActual('../../../store/selectedSlice');
  return {
    ...actual,
    toggleSelected: jest.fn((payload) => ({
      type: 'selected/toggleSelected',
      payload,
    })),
  };
});

describe('SelectionCheckbox', () => {
  const mockData: Person = {
    name: 'Luke Skywalker',
    gender: 'male',
    height: '172',
    mass: '77',
    birth_year: '19BBY',
    url: 'https://swapi.dev/api/people/1/',
  } as Person;

  beforeEach(() => {
    jest.clearAllMocks();
    mockSelectedItems = [];
  });

  it('should render with the checkbox disabled if the element is not in the store', () => {
    mockSelectedItems = [];

    render(<SelectionCheckbox data={mockData} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(false);
  });

  it('should render with the checkbox active if the element is in the store', () => {
    mockSelectedItems = [mockData];

    render(<SelectionCheckbox data={mockData} />);

    const checkbox = screen.getByRole('checkbox') as HTMLInputElement;
    expect(checkbox.checked).toBe(true);
  });

  it('should call dispatch with the toggleSelected action when the checkbox is clicked', () => {
    mockSelectedItems = [];

    render(<SelectionCheckbox data={mockData} />);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    expect(mockDispatch).toHaveBeenCalled();
    expect(toggleSelected).toHaveBeenCalledWith(mockData);
  });
});
