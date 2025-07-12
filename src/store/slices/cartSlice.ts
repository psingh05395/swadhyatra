import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Food } from './foodSlice';

export interface CartItem {
  food: Food;
  quantity: number;
  specialInstructions?: string;
}

interface CartState {
  items: CartItem[];
  total: number;
  deliveryFee: number;
  tax: number;
}

const initialState: CartState = {
  items: [],
  total: 0,
  deliveryFee: 50,
  tax: 0,
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<{ food: Food; quantity: number; specialInstructions?: string }>) => {
      const existingItem = state.items.find(item => item.food.id === action.payload.food.id);
      
      if (existingItem) {
        existingItem.quantity += action.payload.quantity;
      } else {
        state.items.push({
          food: action.payload.food,
          quantity: action.payload.quantity,
          specialInstructions: action.payload.specialInstructions,
        });
      }
      
      cartSlice.caseReducers.calculateTotal(state);
    },
    removeFromCart: (state, action: PayloadAction<string>) => {
      state.items = state.items.filter(item => item.food.id !== action.payload);
      cartSlice.caseReducers.calculateTotal(state);
    },
    updateQuantity: (state, action: PayloadAction<{ foodId: string; quantity: number }>) => {
      const item = state.items.find(item => item.food.id === action.payload.foodId);
      if (item) {
        item.quantity = action.payload.quantity;
        if (item.quantity <= 0) {
          state.items = state.items.filter(item => item.food.id !== action.payload.foodId);
        }
      }
      cartSlice.caseReducers.calculateTotal(state);
    },
    clearCart: (state) => {
      state.items = [];
      state.total = 0;
      state.tax = 0;
    },
    calculateTotal: (state) => {
      const subtotal = state.items.reduce((total, item) => {
        const itemPrice = item.food.discount 
          ? item.food.price * (1 - item.food.discount / 100)
          : item.food.price;
        return total + (itemPrice * item.quantity);
      }, 0);
      
      state.tax = subtotal * 0.18; // 18% GST
      state.total = subtotal + state.deliveryFee + state.tax;
    },
  },
});

export const { addToCart, removeFromCart, updateQuantity, clearCart, calculateTotal } = cartSlice.actions;
export default cartSlice.reducer;