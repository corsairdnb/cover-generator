/* eslint-disable-next-line import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Content } from './types';
//import { AppThunk } from '../../store';

const initialState: Content = {
  date: '',
  time: ''
};

const slice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    setDate: (state, { payload }: PayloadAction<string>) => {
      state.date = payload;
    },
    setTime: (state, { payload }: PayloadAction<string>) => {
      state.time = payload;
    }
  }
});

export const contentActions = slice.actions;
export const { setDate, setTime } = slice.actions;

//export const incrementIfOdd = (): AppThunk => {
//  return (dispatch, getState) => {
//    const state = getState();
//    if (state.counter.value % 2 === 0) {
//      return;
//    }
//    dispatch(increment());
//  };
//};
//
//export const incrementAsync = (delay = 1000): AppThunk => (dispatch) => {
//  setTimeout(() => {
//    dispatch(increment());
//  }, delay);
//};

export const contentReducer = slice.reducer;
