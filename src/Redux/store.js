import { configureStore } from '@reduxjs/toolkit'
import { playerSlice, authSlice } from './toolkitSilce'
import { api } from './api'

import storage from 'reduxjs-toolkit-persist/lib/storage'

// import {persistReducer , persistCombineReducers, persistStore, FLUSH,
//     REHYDRATE,
//     PAUSE,
//     PERSIST,
//     PURGE,
//     REGISTER,} from 'reduxjs-toolkit-persist'


// const persistConfig = {
//     key : "all",
//     storage,
//     blacklist : [api.reducerPath]
// }

// const persistedReducer = persistCombineReducers(
//     persistConfig,
//     {
//         [authSlice.name] : authSlice.reducer,
//         [playerSlice.name] : playerSlice.reducer,
//         [api.reducerPath] : api.reducer,
//     }
// )




// export const store = configureStore({
//     reducer: persistedReducer,//это combineReducers
//     middleware: (getDefaultMiddleware) =>
//     [...getDefaultMiddleware({serializableCheck: {ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER]}}),
//         api.middleware],
// })

// export const persistor = persistStore(store)
export const store = configureStore({
    reducer: {
        [api.reducerPath]: api.reducer,
        [authSlice.name]: authSlice.reducer,
        [playerSlice.name] : playerSlice.reducer
    },//это combineReducers
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(api.middleware)
})


// store.subscribe(() => console.log('NEW REDUX STATE',store.getState()))

