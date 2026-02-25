import { configureStore } from '@reduxjs/toolkit';
import useReducer from './userSlice';
import feedReducer from './feedSlice';
import connectionReducer from './connectionSlice';
export const appStore = configureStore({
  reducer: {
    user: useReducer,
    feed: feedReducer,
    connection: connectionReducer,
  },
});
