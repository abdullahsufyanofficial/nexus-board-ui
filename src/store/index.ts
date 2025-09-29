import { configureStore } from '@reduxjs/toolkit';
import { authSlice } from './slices/authSlice';
import { projectsSlice } from './slices/projectsSlice';
import { tasksSlice } from './slices/tasksSlice';
import { teamsSlice } from './slices/teamsSlice';
import { boardsSlice } from './slices/boardsSlice';

export const store = configureStore({
  reducer: {
    auth: authSlice.reducer,
    projects: projectsSlice.reducer,
    tasks: tasksSlice.reducer,
    teams: teamsSlice.reducer,
    boards: boardsSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['persist/PERSIST'],
      },
    }),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;