import { configureStore } from '@reduxjs/toolkit'

import intakeReducer from './app/slices/intake';
import dischargeReducer from './app/slices/discharge';
import facilityReducer from './app/slices/facility';

import dataReducer from './app/slices/data';
import uiStateReducer from './app/slices/uiState';

import { importExportMiddleware } from './middleware/ImportExportMiddleware';
import { dataAPIMiddleware } from './middleware/DataAPIMiddleware';
import { initMathAction, mathMiddleware } from './middleware/MathMiddleware';
import { errorMiddleware } from './middleware/ErrorMiddleware';
import { initWMSAction, wmsMiddleware } from './middleware/WMSCapabilitiesMiddleware';

export const store = configureStore({
  reducer: {
    intake: intakeReducer,
    discharge: dischargeReducer,
    facility: facilityReducer,

    data: dataReducer,
    uiState: uiStateReducer
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .prepend(importExportMiddleware.middleware)
      .prepend(dataAPIMiddleware.middleware)
      .prepend(mathMiddleware.middleware)
      .prepend(wmsMiddleware.middleware)
      .prepend(errorMiddleware.middleware)
})

// initialize math & WMS
store.dispatch(initMathAction())
store.dispatch(initWMSAction())

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch

