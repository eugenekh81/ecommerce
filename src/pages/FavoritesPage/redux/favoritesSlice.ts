import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ProductIS } from '../../../types/ProductIS';

interface FavoritesSlice {
  items: ProductIS[];
}

const initialState: FavoritesSlice = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const { actions, reducer } = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<ProductIS>) => {
      const existingIndex = state.items.findIndex(
        (p) => p.id === action.payload.id
      );
      if (existingIndex >= 0) {
        state.items.splice(existingIndex, 1);
      } else {
        state.items.push(action.payload);
      }

      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

const { toggleFavorite } = actions;
export { toggleFavorite, reducer };
