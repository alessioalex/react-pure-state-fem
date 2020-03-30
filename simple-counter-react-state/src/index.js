import React from 'react';
import { render } from 'react-dom';

import Counter from './Counter';

import './styles.scss';

const Application = () => {
  return (
    <main className="Application">
      <h3 className="locale-time">
        Last refresh: {new Date().toLocaleTimeString()}
      </h3>

      <section className="Counters">
        <Counter max={99} step={1} />
      </section>
    </main>
  );
};

render(<Application />, document.getElementById('root'));
