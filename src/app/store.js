import createSagaMiddleware from '@redux-saga/core';
import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice';
import counterReducer from '../features/counter/counterSlice';
import rootSaga from './rootSaga';

const sagaMiddleware = createSagaMiddleware();
export const store = configureStore({
    reducer: {
        counter: counterReducer,
        auth: authReducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(sagaMiddleware),
});
sagaMiddleware.run(rootSaga);
