import './index.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { Provider as ReduxProvider } from 'react-redux'
import { createStore } from 'redux';

import {App} from './app';
import {rootReducer, State} from './state';

const initialState: State = {
  entities: [],
  selectedEntity: 0,
  selectedTool: null,
};

const store = createStore(rootReducer, initialState);

ReactDOM.render(
  <React.StrictMode>
    <ReduxProvider store={store}>
      <App />
    </ReduxProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
