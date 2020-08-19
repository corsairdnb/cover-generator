/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-var-requires */

import { createSlice } from '@reduxjs/toolkit';
// eslint-disable-next-line import/no-cycle
import { AppThunk, RootState } from '../../store';

const counterSlice = createSlice({
  name: 'counter',
  initialState: { value: 0 },
  reducers: {
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    }
  }
});

export const { increment, decrement } = counterSlice.actions;

export const incrementIfOdd = (): AppThunk => {
  return (dispatch, getState) => {
    const state = getState();
    if (state.counter.value % 2 === 0) {
      return;
    }
    dispatch(increment());
  };
};

export const incrementAsync = (delay = 1000): AppThunk => (dispatch) => {
  setTimeout(() => {
    dispatch(increment());
  }, delay);
};

export default counterSlice.reducer;

export const selectCount = (state: RootState) => state.counter.value;

export const counterActions = counterSlice.actions;
