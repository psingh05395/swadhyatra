import { configureStore } from '@reduxjs/toolkit';
import authSlice from './slices/authSlice';
import foodSlice from './slices/foodSlice';
import cartSlice from './slices/cartSlice';
import orderSlice from './slices/orderSlice';
import favoriteSlice from './slices/favoriteSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice,
    food: foodSlice,
    cart: cartSlice,
    orders: orderSlice,
    favorites: favoriteSlice,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;