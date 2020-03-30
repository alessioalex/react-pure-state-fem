import React, { useState, useEffect } from 'react';

const Counter = ({ max, step }) => {
  const [count, setCount] = useState(0);

  const increment = () => setCount(count < max ? count + step : count);
  const decrement = () => setCount(count - step);
  const reset = () => setCount(0);

  useEffect(() => {
    document.title = `Count is ${count}`;
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
