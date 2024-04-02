import { configureStore } from '@reduxjs/toolkit'

import intakeReducer from './app/slices/intake';
import dischargeReducer from './app/slices/discharge';
import facilityReducer from './app/slices/facility';

import uiStateReducer from './app/slices/uiState';

import { importExportMiddleware } from './middleware/ImportExportMiddleware';
import { edrApi } from './app/services/temperature';
import { dataAPIMiddleware } from './middleware/DataAPIMiddleware';

export const store = configureStore({
  reducer: {
    intake: intakeReducer,
    discharge: dischargeReducer,
    facility: facilityReducer,

    uiState: uiStateReducer,
    [edrApi.reducerPath]: edrApi.reducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(importExportMiddleware.middleware).prepend(dataAPIMiddleware.middleware).concat(edrApi.middleware)
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

