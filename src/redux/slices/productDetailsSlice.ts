import { createSlice, PayloadAction } from '@reduxjs/toolkit';

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
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    setLoading: (state, _action: PayloadAction<number>) => {
      state.loading = true;
      state.error = null;
    },
  },
});

const { clearProduct, setLoading, setError, setProduct } = actions;
export { clearProduct, setLoading, setError, setProduct, reducer };
