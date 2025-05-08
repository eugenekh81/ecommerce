import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Product } from '../../../redux/types';

export const fetchProducts = createAction('products/fetchProducts');

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
    setProductsLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
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

export const { setProductsLoading, setProductsError, setProducts } = actions;
export default reducer;
