import { configureStore } from '@reduxjs/toolkit';              // Redux Toolkit
import { useDispatch as useAppDispatch, useSelector as useAppSelector } from 'react-redux';         // Redux implementation for react.
import { persistStore, persistReducer } from 'redux-persist';  // Will allow us to persist the data, that means data wont be lost when we refresh or close...

import { rootPersistConfig, rootReducer } from './rootReducer';

const store = configureStore({
    reducer: persistReducer(rootPersistConfig, rootReducer), 
    middleware: (getDefaultMiddleWare) => getDefaultMiddleWare({
        serializableCheck: false,   // Doesn't check if the dispatched action are searlizable(that is they can be converted to JSON). false to skip this check. Useful when dealing with non searalizable values such as functions or promises.
        immutableCheck: false,      // Skips immutablity check, that is if the state has been mutated directly or not. helpful when we have libraries that garantee immutablity. Redux uses Immer.
    })
})


// TO make our state persistable, we need to wrap it around persistStore.
const persistor = persistStore(store);

const { dispatch } = store;                     // configurestore returns this...
const useSelector = useAppSelector;             // useSelector          // why would you even do this?
const useDispatch = () => useAppDispatch();     // This is a function   // why would you even do this?


export { store, persistor, dispatch, useSelector, useDispatch };