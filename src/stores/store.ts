import { AnyAction, configureStore } from '@reduxjs/toolkit'
import { persistReducer, persistStore } from 'redux-persist';
import storage from 'redux-persist/lib/storage';
import { ThunkDispatch } from 'redux-thunk';
import authReducer from './authSlice'
import { artifactsApi, guidesApi } from '../services/db.service';
import { authApi } from '../services/auth.service';

const persistConfig = {
  key: 'root',
  storage,
}

const persistedAuthReducer = persistReducer(persistConfig, authReducer)

export const store = configureStore({
  reducer: {
    auth: persistedAuthReducer,
    [authApi.reducerPath]: authApi.reducer,
    [artifactsApi.reducerPath]: artifactsApi.reducer,
    [guidesApi.reducerPath]: guidesApi.reducer
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({serializableCheck: false}).concat(guidesApi.middleware, artifactsApi.middleware, authApi.middleware)
})

export const persistor = persistStore(store)

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch
export type AppThunkDispatch = ThunkDispatch<RootState, any, AnyAction>