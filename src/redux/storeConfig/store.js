// ** Redux, Thunk & Root Reducer Imports
import thunk from 'redux-thunk'
import createDebounce from 'redux-debounced'
import pReducer from '../reducers/rootReducer'
import { createStore, applyMiddleware, compose } from 'redux'
import { persistStore } from 'redux-persist'

// ** init middleware
const middleware = [thunk, createDebounce()]

// ** Dev Tools
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

// ** Create store
const store = createStore(
  pReducer,
  {},
  composeEnhancers(applyMiddleware(...middleware)),
)
const persistor = persistStore(store, null, () => {})
export { store, persistor }
