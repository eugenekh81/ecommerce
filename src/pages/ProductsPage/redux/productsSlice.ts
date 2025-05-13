import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../redux/types';

interface ProductsState {
  items: Product[];
  loading: boolean;
  error: string | null;
}

const initialState: ProductsState = {
  items: [],
  loading: false,
  error: null,
};

const { actions, reducer } = createSlice({
  name: 'products',
  initialState,
  reducers: {
    getProducts: (state) => {
      state.loading = true;
      state.error = null;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.error = null;
      state.loading = false;
      state.items = action.payload;
    },
    setProductsError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

export const {
  getProducts,
  setProductsError,
  setProducts,
} = actions;
export default reducer;
