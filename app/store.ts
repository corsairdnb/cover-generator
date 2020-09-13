/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */

import { configureStore, getDefaultMiddleware, Action, EnhancedStore } from '@reduxjs/toolkit';
//import { createHashHistory } from 'history';
//import { routerMiddleware } from 'connected-react-router';
import { createLogger } from 'redux-logger';
import { ThunkAction } from 'redux-thunk';
import {
  persistStore,
  persistReducer,
  FLUSH,
  REHYDRATE,
  PAUSE,
  PERSIST,
  PURGE,
  REGISTER
} from 'redux-persist';
import storage from 'redux-persist/lib/storage';
// eslint-disable-next-line import/no-cycle
import { createRootReducer } from './rootReducer';

//export const history = createHashHistory();
const rootReducer = createRootReducer();
export type RootState = ReturnType<typeof rootReducer>;

//const router = routerMiddleware(history);
const middleware = [
  ...getDefaultMiddleware({
    serializableCheck: {
      ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]
    }
  })
  //  router
];

const excludeLoggerEnvs = ['test', 'production'];
const shouldIncludeLogger = !excludeLoggerEnvs.includes(process.env.NODE_ENV || '');

const persistConfig = {
  key: 'storage',
  storage
};

const persistedReducer = persistReducer<RootState>(persistConfig, rootReducer);

if (shouldIncludeLogger) {
  const logger = createLogger({
    level: 'info',
    collapsed: true
  });
  middleware.push(logger);
}

export const configuredStore = (initialState: RootState) => {
  // Create Store
  const store = configureStore({
    reducer: persistedReducer,
    middleware,
    preloadedState: initialState
  });

  if (process.env.NODE_ENV === 'development' && module.hot) {
    module.hot.accept(
      './rootReducer',
      // eslint-disable-next-line global-require
      () => store.replaceReducer(require('./rootReducer').default)
    );
  }
  persistStore(store);
  // TODO: return persistor for PersistGate
  return store as EnhancedStore<RootState>;
};

export type Store = ReturnType<typeof configuredStore>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;
