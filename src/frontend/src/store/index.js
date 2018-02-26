import { createStore, applyMiddleware } from 'redux'
import { logger } from 'redux-logger'
import reducers from '../reducers'
import { createEpicMiddleware, combineEpics } from 'redux-observable'
import { 
  APP_INIT, 
  NAVIGATION_MENU_CLICK, 
  PAGE_LOAD 
} from '../epics'

const epics = combineEpics( 
  APP_INIT, 
  NAVIGATION_MENU_CLICK, 
  PAGE_LOAD 
)
const epicMiddleware = createEpicMiddleware(epics)
const store = createStore( reducers, window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), applyMiddleware(logger, epicMiddleware) )

store.dispatch({type: 'APP_INIT'})

export default store