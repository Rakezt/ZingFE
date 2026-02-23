import { createSlice } from '@reduxjs/toolkit';

const feedSlice = createSlice({
  name: 'feed',
  initialState: [],
  reducers: {
    addFeed: (_, action) => {
      return action.payload;
    },
    removeFeed: () => {
      return [];
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
