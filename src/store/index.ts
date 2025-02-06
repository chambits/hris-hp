import { configureStore } from '@reduxjs/toolkit';
import { setupListeners } from '@reduxjs/toolkit/query';
import { employeesApi } from '../features/employees/employeesApi';

export const store = configureStore({
  reducer: {
    // Add the generated reducer as a specific top-level slice
    [employeesApi.reducerPath]: employeesApi.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling, and other features of RTK Query
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(employeesApi.middleware),
});

// optional, but required for refetchOnFocus/refetchOnReconnect behaviors
setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
