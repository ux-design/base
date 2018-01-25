import { createStore, applyMiddleware, combineReducers } from 'redux'
import { logger } from 'redux-logger'
import reducer from '../reducers'
import epics from '../epics'
import { createEpicMiddleware, combineEpics } from 'redux-observable'

const epicMiddleware = createEpicMiddleware(epics)
const store = createStore( reducer, applyMiddleware(logger, epicMiddleware) )

export default store