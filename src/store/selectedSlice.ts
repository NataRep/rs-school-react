// src/store/selectedSlice.ts
import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { SearchItem } from '../components/search/search-result-item/SearchResultItem';

interface SelectedState {
  items: SearchItem[];
}

const initialState: SelectedState = {
  items: [],
};

const selectedSlice = createSlice({
  name: 'selected',
  initialState,
  reducers: {
    hydrateSelectedItems: (state) => {
      if (typeof window !== 'undefined') {
        const saved = localStorage.getItem('sw_selected_items');
        if (saved) {
          try {
            state.items = JSON.parse(saved);
          } catch (e) {
            console.error(
              'Failed to parse sw_selected_items from localStorage',
              e,
            );
          }
        }
      }
    },

    toggleSelected: (state, action: PayloadAction<SearchItem>) => {
      const itemExists = state.items.find(
        (item) => item.name === action.payload.name,
      );

      if (itemExists) {
        state.items = state.items.filter(
          (item) => item.name !== action.payload.name,
        );
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem('sw_selected_items', JSON.stringify(state.items));
    },

    clearSelected: (state) => {
      state.items = [];
      localStorage.removeItem('sw_selected_items');
    },
  },
});

export const { hydrateSelectedItems, toggleSelected, clearSelected } =
  selectedSlice.actions;
export default selectedSlice.reducer;
