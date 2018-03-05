import Immutable from 'immutable'
const ip = window.location.hostname

const initialState = Immutable.fromJS({
  ready: false,
  route: null,
  logo: '',
  content: null,
  templates: {}
})
const appReady = state => {
  return state.set('ready', true)
}
const updateRoute = (state, payload) => {
  return state.set('route', payload)
}
const templateLoad = (state, payload) => {
  let templates = state.get('templates')
  templates = templates.set(payload.url, payload.data)
  let newState = state.set('templates', templates)
  return newState
}
const templateRender = state => {
  return state.set('content', state.get('templates').get('http://'+ip+'/templates' + state.get('route')))
}
const appScrollTop = state => {
  window.scrollTo(0,0)
  return state
}

export default ( state = initialState, action ) => {
  switch(action.type){
    case "APP_READY":
      return appReady(state)
    case "ROUTE_UPDATE":
      return updateRoute(state, action.payload)
    case "TEMPLATE_LOAD":
      return templateLoad(state, action.payload)
    case "TEMPLATE_RENDER":
      return templateRender(state)
    case "APP_SCROLL_TOP":
      return appScrollTop(state)
    default:
      return state
  }
}