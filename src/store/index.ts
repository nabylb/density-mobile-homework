import {createStore} from 'redux';
import {persistStore, persistCombineReducers} from 'redux-persist';
import AsyncStorage from '@react-native-community/async-storage';
import {composeWithDevTools} from 'redux-devtools-extension';
import reducers from './reducers';

export const createLocalStore = async () => {
  // configure persistence
  const persistConfig = {
    key: `density`,
    version: 1,
    blacklist: ['ble.isScanning'],
    storage: AsyncStorage,
  };

  // create reducer
  const persistedReducer = persistCombineReducers(persistConfig, reducers);

  // create enhancer
  const enhancer = composeWithDevTools();

  // create store, with persistence
  return new Promise((resolve) => {
    const reduxStore = createStore(persistedReducer, {}, enhancer);
    persistStore(reduxStore, {}, () => resolve(reduxStore));
  });
};

export default createLocalStore;
