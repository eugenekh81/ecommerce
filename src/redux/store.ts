import { configureStore } from '@reduxjs/toolkit';
import productsReducer from './slices/productsSlice';
import productDetailsReducer from './slices/productDetailsSlice';
import cartReducer from './slices/cartSlice';

const saveCart = (state: RootState) => {
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
});

store.subscribe(() => {
  saveCart(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
