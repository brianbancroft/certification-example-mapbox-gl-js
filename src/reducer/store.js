import { applyMiddleware, combineReducers, createStore, compose } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'

import logger from 'redux-logger'
import vehicles from './truckReducer'
const composeEnhancers = composeWithDevTools({
  // Specify name here, actionsBlacklist, actionsCreators and other options if needed
})
const reducers = { vehicles }
const middlewares = [logger]

const store =
  process.env.NODE_ENV === 'development'
    ? createStore(
        combineReducers(reducers),
        composeEnhancers(applyMiddleware(...middlewares)),
      )
    : createStore(combineReducers(reducers))

export default store
