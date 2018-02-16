import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import reducer from '../reducers'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { APP_INIT } from '../epics'

const epics = combineEpics( APP_INIT )
const epicMiddleware = createEpicMiddleware(epics)
const store = createStore( reducer, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(logger, epicMiddleware) )

store.dispatch({type: 'APP_INIT'})

export default store