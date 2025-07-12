import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Food {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  rating: number;
  reviews: number;
  ingredients: string[];
  preparationTime: number;
  isVegetarian: boolean;
  isSpicy: boolean;
  discount?: number;
}

export interface Category {
  id: string;
  name: string;
  image: string;
  description: string;
}

interface FoodState {
  foods: Food[];
  categories: Category[];
  selectedCategory: string | null;
  searchQuery: string;
  loading: boolean;
}

const initialState: FoodState = {
  foods: [],
  categories: [],
  selectedCategory: null,
  searchQuery: '',
  loading: false,
};

const foodSlice = createSlice({
  name: 'food',
  initialState,
  reducers: {
    setFoods: (state, action: PayloadAction<Food[]>) => {
      state.foods = action.payload;
    },
    setCategories: (state, action: PayloadAction<Category[]>) => {
      state.categories = action.payload;
    },
    setSelectedCategory: (state, action: PayloadAction<string | null>) => {
      state.selectedCategory = action.payload;
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
  },
});

export const { setFoods, setCategories, setSelectedCategory, setSearchQuery, setLoading } = foodSlice.actions;
export default foodSlice.reducer;