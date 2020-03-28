import React, { Component } from 'react';

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
  const storage = localStorage.getItem('counterState');

  if (storage) {
    return JSON.parse(storage);
  }

  return { count: 0 };
};

const setStateInLocalStorage = state => {
  localStorage.setItem('counterState', JSON.stringify(state));
};

class Counter extends Component {
  constructor(props) {
    super(props);

    // this.state = {
    //   count: 0,
    // };
    this.state = getStateFromLocalStorage();

    this.increment = this.increment.bind(this);
    this.decrement = this.decrement.bind(this);
    this.reset = this.reset.bind(this);
  }

  updateTitle() {
    document.title = `Count is ${this.state.count || 0}!`;
  }

  increment() {
    // this.setState(state, props)
    // this.setState returns nothing -> nothing updated
    this.setState(
      (state, props) => {
        const { count } = state;
        const { max, step } = props;

        if (count < max) {
          return { count: count + step };
        }

        return { count };
      },
      () => {
        // console.log('After!', this.state);
        setStateInLocalStorage(this.state);
        this.updateTitle();
      },
    );
  }

  decrement() {
    const { count } = this.state;
    const { step } = this.props;

    this.setState({ count: count - step }, () => {
      setStateInLocalStorage(this.state);
      this.updateTitle();
    });
  }

  reset() {
    const newState = { count: 0 };
    this.setState(newState, () => this.updateTitle());
    setStateInLocalStorage(newState);
  }

  render() {
    const { count } = this.state;

    return (
      <div className="Counter">
        <p className="count">{count}</p>
        <section className="controls">
          <button onClick={this.increment}>Increment</button>
          <button onClick={this.decrement}>Decrement</button>
          <button onClick={this.reset}>Reset</button>
        </section>
      </div>
    );
  }
}

export default Counter;
