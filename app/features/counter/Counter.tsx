import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import routes from '../../constants/routes.json';
import { increment, decrement, incrementIfOdd, incrementAsync, selectCount } from './counterSlice';
import { RootState } from '../../store';

export default function Counter() {
  const dispatch = useDispatch();
  const value = useSelector<RootState, number>(selectCount);
  return (
    <div>
      <div data-tid="backButton">
        <Link to={routes.HOME}>
          <i className="fa fa-arrow-left fa-3x" />
        </Link>
      </div>
      <div data-tid="counter">{value}</div>
      <div>
        <button
          onClick={() => {
            dispatch(increment());
          }}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-plus" />
        </button>
        <button
          onClick={() => {
            dispatch(decrement());
          }}
          data-tclass="btn"
          type="button"
        >
          <i className="fa fa-minus" />
        </button>
        <button
          onClick={() => {
            dispatch(incrementIfOdd());
          }}
          data-tclass="btn"
          type="button"
        >
          odd
        </button>
        <button
          onClick={() => {
            dispatch(incrementAsync());
          }}
          data-tclass="btn"
          type="button"
        >
          async
        </button>
      </div>
    </div>
  );
}
