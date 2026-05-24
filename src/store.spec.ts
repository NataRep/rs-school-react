import { store } from './store';

describe('Redux store', () => {
  it('should be defined and have correct initial structure', () => {
    expect(store).toBeDefined();

    const state = store.getState();

    expect(state).toHaveProperty('selected');
  });
});