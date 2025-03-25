import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../types';


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
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setProducts: (state, action: PayloadAction<Product[]>) => {
      state.error = null;
      state.loading = false;
      state.items = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
  },
});

const { setLoading, setError, setProducts } = actions;
export { setLoading, setError, setProducts, reducer };
