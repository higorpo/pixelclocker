import { applyMiddleware, createStore } from 'redux';
import { persistStore, persistReducer } from 'redux-persist';
import { AsyncStorage } from 'react-native';
import logger from 'redux-logger';

import reducers from './ducks';

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 0, // The code base checks for falsy, so 0 disables
    // blacklist: ['schedule']
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export { store, persistor };