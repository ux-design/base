import { combineReducers } from 'redux'

import app from './app'
import navigation from './navigation'
import block from './block'
import viewer from './viewer'

const reducers = combineReducers({
  app, navigation, block, viewer
})

export default reducers