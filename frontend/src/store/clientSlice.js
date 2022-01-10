import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  maxMood: null,
};

const client = createSlice({
  name: 'client',
  initialState,
  reducers: {
    setMaxMood: (state, action) => {
      state.maxMood = action.payload;
    },
  },
});

export const { reducer: clientReducer } = client;
export const { setMaxMood } = client.actions;
