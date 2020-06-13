import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import logger from 'redux-logger'
import storage from 'redux-persist/lib/storage'
import thunk from 'redux-thunk'
import rootReducer from './reducers'

const persistConfig = {
    key: 'root',
    storage,
}

const persistedReducer = persistReducer(persistConfig, rootReducer)

const middleware = [thunk, logger]

export function configureStore() {
    let store = createStore(persistedReducer, compose(
        applyMiddleware(...middleware)))
    let persistor = persistStore(store)
    return { store, persistor }
}