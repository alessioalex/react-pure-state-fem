import React, { useState, useEffect } from 'react';

/*
// extracting logic for reuse and testability
const increment = (state, props) => {
  const { count } = state;
  const { max, step } = props;

  if (count < max) {
    return { count: count + step };
  }

  return { count };
};
*/

const getStateFromLocalStorage = () => {
  const count = parseInt(localStorage.getItem('countState'), 0);

  return count || 0;
};

const setStateInLocalStorage = count => {
  localStorage.setItem('countState', count);
};

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(getStateFromLocalStorage());

  const increment = () => setCount(count < max ? count + step : count);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);

  useEffect(() => {
    document.title = `Count is ${count}`;
    setStateInLocalStorage(count);
  }, [count]);

  return (
    <div className="Counter">
      <p className="count">{count}</p>
      <section className="controls">
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
        <button onClick={reset}>Reset</button>
      </section>
    </div>
  );
};

export default Counter;
