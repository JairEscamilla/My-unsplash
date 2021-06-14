import React from 'react';
import { Provider } from 'react-redux';
import { createStore, compose } from 'redux';
import globalState from './reducers/globalState';
import { User } from './api/models/LoginResponse';
import Routes from './Routes';

export type globalStateType = {
  loading: boolean;
  authenticated: boolean;
  token: string | null;
  user: User
} 

export const initialState: globalStateType = {
  loading: false,
  authenticated: false,
  token: null,
  user: {
    username: '',
    email: '',
    profile_photo: ''
  }
}

// const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
declare global {
    interface Window {
      __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
    }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(globalState, initialState, composeEnhancers());

const App = () => {
  return (
    <Provider store={store}>
        <Routes/>
    </Provider>
  )
}

export default App;