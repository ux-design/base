import actions from '../actions/'
import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  app: {
      ready: false,
      route: null,
      logo: '',
      content: null
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

const updateRoute = (state, payload) => {
  let app = state.get('app')
  app = app.set('route', payload)
  let newState = state.set('app', app)
  return newState
}

const templateLoad = (state, payload) => {
  let content = state.get('content')
  content = content.set(payload.url, payload.data)
  let newState = state.set('content', content)
  return newState
}

const templateRender = (state, payload) => {
  let app = state.get('app')
  app = app.set('content', state.get('content').get('http://localhost/templates' + state.get('app').get('route')))
  let newState = state.set('app', app)
  console.log(payload)
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
    case "ROUTE_UPDATE":
      return updateRoute(state, action.payload)
    case "TEMPLATE_LOAD":
      return templateLoad(state, action.payload)
    case "TEMPLATE_RENDER":
      return templateRender(state)
    default:
      return state
  }
}