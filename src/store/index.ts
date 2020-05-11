import { AsyncStorage } from 'react-native';
import { applyMiddleware, createStore } from 'redux';
import logger from 'redux-logger';
import { persistReducer, persistStore } from 'redux-persist';
import reducers from './ducks';


const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
    timeout: 0,
    // blacklist: ['schedule']
}

const persistedReducer = persistReducer(persistConfig, reducers);

const store = createStore(persistedReducer, applyMiddleware(logger));
const persistor = persistStore(store);

export { store, persistor };
