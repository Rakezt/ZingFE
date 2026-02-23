import { configureStore } from '@reduxjs/toolkit';
import useReducer from './userSlice';
import feedReducer from './feedSlice';
export const appStore = configureStore({
  reducer: { user: useReducer, feed: feedReducer },
});
