import React, { useState, useEffect, useRef } from 'react';

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(0);

  const countRef = useRef();
  // { current: null }

  let message = '';
  if (countRef.current < count) {
    message = 'Higher';
  } else {
    message = 'Lower';
  }

  countRef.current = count;

  const increment = () => setCount(count < max ? count + step : count);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);

  useEffect(() => {
    // adding a setInterval for each value change
    const id = setInterval(() => {
      console.log(`Count: ${count}`);
    }, 1500);

    // cleanup function
    return () => clearInterval(id);
  }, [count]);

  return (
    <div className="Counter">
      <p>{message}</p>
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
