import { configureStore } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from "redux-persist/lib/storage"; // Default storage is localStorage for web
import userReducer from "./userSlice";

// Persistence configuration for Redux Persist
const persistConfig = {
  key: "user",  // Key for storage in localStorage
  storage,      // Storage engine to use
};

// Wrap the user reducer with persistReducer
const persistedUserReducer = persistReducer(persistConfig, userReducer);

const appStore = configureStore({
  reducer: {
    user: persistedUserReducer, // Use persisted reducer for user
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false, // Disable checks for Redux Persist
    }),
});

// Export both store and persistor
export const persistor = persistStore(appStore);
export default appStore;
