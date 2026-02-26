import { createSlice } from '@reduxjs/toolkit';

interface FeedItem {
  _id: string;
  [key: string]: unknown;
}

const feedSlice = createSlice({
  name: 'feed',
  initialState: [] as FeedItem[],
  reducers: {
    addFeed: (_, action) => {
      return action.payload;
    },
    removeFeed: (state, action) => {
      const newArray = state.filter((user) => user._id !== action.payload);
      return newArray;
    },
  },
});

export const { addFeed, removeFeed } = feedSlice.actions;
export default feedSlice.reducer;
