import { createSlice } from '@reduxjs/toolkit';

const connectionSlice = createSlice({
  name: 'connection',
  initialState: null,
  reducers: {
    addConnection: (_, action) => {
      return action.payload;
    },
    removeConnection: () => {
      return null;
    },
  },
});

export const { addConnection, removeConnection } = connectionSlice.actions;
export default connectionSlice.reducer;
