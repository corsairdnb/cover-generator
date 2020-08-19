/* eslint-disable import/no-cycle */
import { combineReducers } from 'redux';
import { connectRouter } from 'connected-react-router';
import { History } from 'history';
import counterReducer from './features/counter/counterSlice';
import { contentReducer } from './features/cover/slice';

export const createRootReducer = (history: History) => {
  return combineReducers({
    router: connectRouter(history),
    counter: counterReducer,
    content: contentReducer
  });
};
