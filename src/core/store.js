import { combineReducers, configureStore } from "@reduxjs/toolkit";
import {
  FLUSH,
  PAUSE,
  PERSIST,
  persistReducer,
  persistStore,
  PURGE,
  REGISTER,
  REHYDRATE,
} from "redux-persist";
import storage from "redux-persist/lib/storage";

import apiSlice from "./features/api/apiSlice";
import authReducer from "./features/auth/authSlice";
import notificationReducer from "./features/notifications/NotificationSlice";

const persistConfig = {
  key: "root",
  version: 1,
  storage: storage,
  blacklist: ["notification"],
};

const rootReducer = combineReducers({
  [apiSlice.reducerPath]: apiSlice.reducer,
  auth: authReducer,
  notification: notificationReducer,
});

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoreActions: [FLUSH, PAUSE, PERSIST, PURGE, REGISTER, REHYDRATE],
      },
    }).concat(apiSlice.middleware),
  //   devTools: false,
});

let persistor = persistStore(store);

export default store;

export { persistor };
