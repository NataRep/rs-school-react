import type { Person } from "./api-models";
import reducer, { clearSelected, toggleSelected } from "./selectedSlice";


const mockPerson: Person = {
  name: 'Luke Skywalker',
  gender: 'male',
  height: '172',
  mass: '77',
  birth_year: '19BBY',
  url: 'https://swapi.dev/api/people/1/',
} as Person;


describe('Selected Slice', () => {
  it('should add item when not exists', () => {
    const state = reducer(
      { items: [] },
      toggleSelected(mockPerson)
    );

    expect(state.items).toHaveLength(1);
    expect(state.items[0]).toEqual(mockPerson);
  });

  it('should remove item when already exists', () => {

    const state = reducer(
      { items: [mockPerson] },
      toggleSelected(mockPerson)
    );

    expect(state.items).toHaveLength(0);
  });

  it('should clear all items', () => {
    const state = reducer(
      { items: [mockPerson] },
      clearSelected()
    );

    expect(state.items).toEqual([]);
  });
});