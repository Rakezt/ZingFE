import { createSlice } from '@reduxjs/toolkit';

interface Request {
  _id: string;
  [key: string]: string;
}

const requestSlice = createSlice({
  name: 'request',
  initialState: [] as Request[],
  reducers: {
    addRequests: (_, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      const newArray = state.filter(
        (request) => request._id !== action.payload,
      );
      return newArray;
    },
  },
});

export const { addRequests, removeRequest } = requestSlice.actions;
export default requestSlice.reducer;
