import { configureStore } from '@reduxjs/toolkit';
import { reducer as productDetailsReducer } from './slices/productDetailsSlice';
import { reducer as productsReducer } from './slices/productsSlice';
import cartReducer from './slices/cartSlice';
import { listenerMiddleware } from './listenerMiddleware';

const saveCart = (state: RootState) => {
  localStorage.setItem('cart', JSON.stringify(state.cart));
};

const store = configureStore({
  reducer: {
    products: productsReducer,
    productDetails: productDetailsReducer,
    cart: cartReducer,
  },
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().prepend(listenerMiddleware.middleware);
  },
});

store.subscribe(() => {
  saveCart(store.getState());
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
