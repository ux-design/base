import actions from '../actions/'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  app: {
      ready: false,
      route: null
  },
  preloader: {
    visible: true
  },
  navigation: {

  },
  content: {
    
  }
})

const appReady = (state) => {
  let app = state.get('app')
  app = app.set('ready', true)
  let newState = state.set('app', app)
  return newState
}

const preloaderHide = (state) => {
  let preloader = state.get('preloader')
  preloader = preloader.set('visible', false)
  let newState = state.set('preloader', preloader)
  return newState
}

const preloaderShow = (state) => {
  let preloader = state.get('preloader')
  preloader = preloader.set('visible', true)
  let newState = state.set('preloader', preloader)
  return newState
}

const updateContet = (state, payload) => {
  let content = state.get('content')
  content = content.set(payload.url, payload.data)
  let newState = state.set('content', content)
  return newState
}

export default ( state = initialState, action ) => {
  switch(action.type){
    case "APP_READY":
      return appReady(state)
    case "PRELOADER_HIDE":
      return preloaderHide(state)
    case "PRELOADER_SHOW":
      return preloaderShow(state)
    case "UPDATE_CONTENT":
      return updateContet(state, action.payload)
    default:
      return state
  }
}