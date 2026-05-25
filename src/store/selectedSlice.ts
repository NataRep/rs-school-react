import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SearchItem } from '../components/search/search-result-item/SearchResultItem';

interface SelectedState {
  items: SearchItem[];
}

const initialState: SelectedState = {
  items: JSON.parse(localStorage.getItem('sw_selected_items') || '[]'),
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    toggleSelected: (state, action: PayloadAction<SearchItem>) => {
      const itemExists = state.items.find(item => item.name === action.payload.name);

      if (itemExists) {
        state.items = state.items.filter(item => item.name !== action.payload.name);
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem('sw_selected_items', JSON.stringify(state.items));
    },

    clearSelected: (state) => {
      state.items = [];
      localStorage.removeItem('sw_selected_items');
    }
  }
});

export const { toggleSelected, clearSelected } = selectedSlice.actions;
export default selectedSlice.reducer;