import { combineReducers } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist-filesystem-storage';
import createSensitiveStorage from 'redux-persist-sensitive-storage';

import settingsReducer from './settingsSlice';
import authReducer from './authSlice';

const sensitiveStorage = createSensitiveStorage({
  keychainService: 'myKeychain',
  sharedPreferencesName: 'mySharedPrefs',
});

const tokenPersistConfig = {
  key: 'auth',
  storage: sensitiveStorage,
};

const rootPersistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth'],
};

const rootReducer = combineReducers({
  auth: persistReducer(tokenPersistConfig, authReducer),
  settings: settingsReducer,
});

export default persistReducer(rootPersistConfig, rootReducer);
