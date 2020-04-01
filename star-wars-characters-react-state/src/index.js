import React, { useEffect, useReducer } from 'react';
import ReactDOM from 'react-dom';

import { BrowserRouter as Router } from 'react-router-dom';

import CharacterList from './CharacterList';

import './styles.scss';

import endpoint from './endpoint';

const initialState = {
  result: null,
  loading: true,
  error: null,
};

const fetchReducer = (state, action) => {
  if (action.type === 'LOADING') {
    return initialState;
  }

  if (action.type === 'RESPONSE_COMPLETE') {
    return {
      result: action.payload.response,
      loading: false,
      error: null,
    };
  }

  if (action.type === 'ERROR') {
    return {
      result: null,
      loading: false,
      error: action.payload.error,
    };
  }

  return state;
};

const useFetch = url => {
  const [state, dispatch] = useReducer(fetchReducer, initialState);

  useEffect(() => {
    dispatch({ type: 'LOADING ' });

    const fetchUrl = async () => {
      try {
        const response = await fetch(url);
        const data = await response.json();

        dispatch({ type: 'RESPONSE_COMPLETE', payload: { response: data } });
      } catch (error) {
        dispatch({ type: error, payload: error });
      }
    };

    fetchUrl();
    // eslint-disable-next-line
  }, []);

  return state;
};

const Application = () => {
  const { result, loading, error } = useFetch(`${endpoint}/characters`);
  const characters = result ? result.characters : [];

  return (
    <div className="Application">
      <header>
        <h1>Star Wars Characters</h1>
      </header>
      <main>
        <section className="sidebar">
          {loading ? (
            <p>Loading...</p>
          ) : (
            <CharacterList characters={characters} />
          )}
          {error && <p className="error">{error.message}</p>}
        </section>
      </main>
    </div>
  );
};

const rootElement = document.getElementById('root');

ReactDOM.render(
  <Router>
    <Application />
  </Router>,
  rootElement,
);
