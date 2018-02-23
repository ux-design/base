import Immutable from 'immutable'
const ip = window.location.hostname

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
  viewer: {
    visible: false,
    content: {
      type: null,
      url: null
    }
  },
  templates: {}
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
  document.querySelector('body').style.overflow='auto'
  document.ontouchmove = function (e) {
  }
  return newState
}

const preloaderShow = (state) => {
  let preloader = state.get('preloader')
  preloader = preloader.set('visible', true)
  let newState = state.set('preloader', preloader)
  document.querySelector('body').style.overflow='hidden'
  document.ontouchmove = function (e) {
    e.preventDefault();
  }
  return newState
}

const updateRoute = (state, payload) => {
  let app = state.get('app')
  app = app.set('route', payload)
  let newState = state.set('app', app)
  return newState
}

const templateLoad = (state, payload) => {
  let templates = state.get('templates')
  templates = templates.set(payload.url, payload.data)
  let newState = state.set('templates', templates)
  return newState
}

const templateRender = (state) => {
  let app = state.get('app')
  app = app.set('content', state.get('templates').get('http://'+ip+'/templates' + state.get('app').get('route')))
  let newState = state.set('app', app)
  return newState
}

const viewerShowImage = (state, payload) => {
  let viewer = state.get('viewer')
  const content = {
    type: 'image',
    url: payload.src
  } 
  viewer = viewer.set('content', content)
  viewer = viewer.set('visible', true)
  let newState = state.set('viewer', viewer)
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
    case "VIEWER_SHOW_IMAGE":
      return viewerShowImage(state, action.payload)
    default:
      return state
  }
}