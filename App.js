import React from 'react';
import { createStore, combineReducers } from 'redux';
import { Provider } from 'react-redux';
import AppNavigator from './navigation/AppNavigator';
import productsReducer from './store/reducers/product_reducer';
import sellItemReducer from './store/reducers/sellItem_reducer';

const rootReducer = combineReducers({
  products: productsReducer,
  sellItem: sellItemReducer
});
const store = createStore(rootReducer);

export default function App() {
  return (
    <Provider store={store}>
      <AppNavigator />
    </Provider>
  );
}

