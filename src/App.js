import React, { Component } from 'react';
import Searcher from './searcher';

import { Provider } from 'react-redux';
import { persistStore, persistReducer } from 'redux-persist'
import rootReducer from './Reducer';
import  AsyncStorage  from '@react-native-community/async-storage';
import { PersistGate } from 'redux-persist/integration/react';
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

debugger;

const persistConfig = {
  key: "root",    
  storage: AsyncStorage,
  timeout: null,
};
const persistedReducer = persistReducer(persistConfig, rootReducer)
const middleware = applyMiddleware(thunk);
const store = createStore(persistedReducer, middleware);
const persistedStore = persistStore(store);


class App extends Component {
  render() {
    return (
      <Provider store={store}>
      <PersistGate loading={null} persistor={persistedStore} >
        <Searcher/>
      </PersistGate>
      </Provider>
    );
  }
}

export default App;
