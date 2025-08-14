import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage";
import usersReducer from "./slices/usersSlice";
import countriesReducer from "./slices/countriesSlice";
import authReducer, { logout } from "./slices/authLoginSlice";
import profileReducer from "./slices/profileSlice";
import userExperiencesReducer from "./slices/usersExperiencesSlice";
import userEducationReducer from "./slices/userEducationSlice";
import userInfoReducer from "./slices/userInfoSlice";
import userPostReducer from "./slices/userPostSlice";
const appReducer = combineReducers({
  users: usersReducer,
  countries: countriesReducer,
  auth: authReducer,
  profile: profileReducer,
  userExperiences: userExperiencesReducer,
  userEducation: userEducationReducer,
  userInfo: userInfoReducer,
  userPost: userPostReducer,
});

const rootReducer = (state, action) => {
  if (action.type === logout.type) {
    storage.removeItem("persist:root");
    state = undefined;
  }
  return appReducer(state, action);
};

const persistConfig = {
  key: "root",
  storage,
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export const persistor = persistStore(store);
