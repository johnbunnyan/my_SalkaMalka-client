import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import reducer from '../reducers/reducer';

const persistConfig = {
  key: 'root',
  storage
};
const enhancedReducer = persistReducer(persistConfig, reducer);
const store = createStore(enhancedReducer, applyMiddleware(logger));

export default store;