import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import sessionStorage from "redux-persist/lib/storage/session";
import issuesReducer from "./slices/issuesSlice";
import repoReducer from "./slices/repoSlice";
import uiReducer from "./slices/uiSlice";

const issuesPersistConfig = {
  key: "issues",
  storage,
};

const uiPersistConfig = {
  key: "ui",
  storage: sessionStorage,
};

const repoPersistConfig = {
  key: "repo",
  storage: sessionStorage,
};

const rootReducer = combineReducers({
  issues: persistReducer(issuesPersistConfig, issuesReducer),
  repo: persistReducer(repoPersistConfig, repoReducer),
  ui: persistReducer(uiPersistConfig, uiReducer),
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;