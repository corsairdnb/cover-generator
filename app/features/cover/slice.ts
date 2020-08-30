/* eslint-disable-next-line import/no-cycle */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { ContentState } from './types';
import { CONTENT_NAMESPACE } from './constants';
//import { AppThunk } from '../../store';

export const initialContentState: ContentState = {
  date: '',
  time: '',
  fontFamily: ''
};

const slice = createSlice({
  name: CONTENT_NAMESPACE,
  initialState: initialContentState,
  reducers: {
    setDate: (state, { payload }: PayloadAction<string>) => {
      state.date = payload;
    },
    setTime: (state, { payload }: PayloadAction<string>) => {
      state.time = payload;
    },
    setFontFamily: (state, { payload }: PayloadAction<string>) => {
      state.fontFamily = payload;
    }
  }
});

export const contentActions = slice.actions;
export const { setDate, setTime, setFontFamily } = slice.actions;

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
