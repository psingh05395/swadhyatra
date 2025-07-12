import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Food } from './foodSlice';

interface FavoriteState {
  favorites: Food[];
}

const initialState: FavoriteState = {
  favorites: [],
};

const favoriteSlice = createSlice({
  name: 'favorites',
  initialState,
  reducers: {
    addToFavorites: (state, action: PayloadAction<Food>) => {
      const exists = state.favorites.find(food => food.id === action.payload.id);
      if (!exists) {
        state.favorites.push(action.payload);
      }
    },
    removeFromFavorites: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(food => food.id !== action.payload);
    },
    toggleFavorite: (state, action: PayloadAction<Food>) => {
      const exists = state.favorites.find(food => food.id === action.payload.id);
      if (exists) {
        state.favorites = state.favorites.filter(food => food.id !== action.payload.id);
      } else {
        state.favorites.push(action.payload);
      }
    },
  },
});

export const { addToFavorites, removeFromFavorites, toggleFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;