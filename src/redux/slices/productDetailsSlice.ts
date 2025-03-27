import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

const fetchProduct = createAction<number>('productDetail/fetchProduct');

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
}

interface ProductDetailState {
  product: Product | null;
  loading: boolean;
  error: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  loading: false,
  error: null,
};

const { actions, reducer } = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
    setProduct: (state, action: PayloadAction<Product>) => {
      state.error = null;
      state.loading = false;
      state.product = action.payload;
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
      state.loading = false;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
      state.error = null;
    },
  },
});

const { clearProduct, setLoading, setError, setProduct } = actions;
export {
  clearProduct,
  setLoading,
  setError,
  setProduct,
  fetchProduct,
  reducer,
};
