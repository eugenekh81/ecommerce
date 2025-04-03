import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FavoritesSlice {
  items: number[];
}

const initialState: FavoritesSlice = {
  items: JSON.parse(localStorage.getItem('favorites') || '[]'),
};

const { actions, reducer } = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<number>) => {
      const productId = action.payload;
      if (state.items.includes(productId)) {
        state.items = state.items.filter((id) => id !== productId);
      } else {
        state.items.push(productId);
      }

      localStorage.setItem('favorites', JSON.stringify(state.items));
    },
  },
});

const { toggleFavorite } = actions;
export { toggleFavorite, reducer };
