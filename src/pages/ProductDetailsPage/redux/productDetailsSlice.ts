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
  productLoading: boolean;
  productError: string | null;
}

const initialState: ProductDetailState = {
  product: null,
  productLoading: false,
  productError: null,
};

const { actions, reducer } = createSlice({
  name: 'productDetail',
  initialState,
  reducers: {
    clearProduct: (state) => {
      state.product = null;
    },
    setProduct: (state, action: PayloadAction<Product>) => {
      state.productError = null;
      state.productLoading = false;
      state.product = action.payload;
    },
    setProductError: (state, action: PayloadAction<string>) => {
      state.productError = action.payload;
      state.productLoading = false;
    },
    setProductLoading: (state, action: PayloadAction<boolean>) => {
      state.productLoading = action.payload;
      state.productError = null;
    },
  },
});

const {
  clearProduct,
  setProductLoading,
  setProductError,
  setProduct,
} = actions;
export {
  clearProduct,
  setProductLoading,
  setProductError,
  setProduct,
  fetchProduct,
  reducer,
};
