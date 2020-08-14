import { applyMiddleware, combineReducers, createStore } from 'redux'
import logger from 'redux-logger'
import vehicles from './truckReducer'

const reducers = { vehicles }
const middlewares = [logger]

const store =
  process.env.NODE_ENV === 'development'
    ? createStore(combineReducers(reducers), applyMiddleware(...middlewares))
    : createStore(combineReducers(reducers))

export default store
