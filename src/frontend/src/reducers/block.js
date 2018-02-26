import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  preloader: {
    visible: true
  },
})

const preloaderHide = state => {
  let preloader = state.get('preloader')
  preloader = preloader.set('visible', false)
  let newState = state.set('preloader', preloader)
  scrollEnable()
  return newState
}

const preloaderShow = state => {
  let preloader = state.get('preloader')
  preloader = preloader.set('visible', true)
  let newState = state.set('preloader', preloader)
  scrollDisable()
  return newState
}

const scrollDisable = state => {
  document.querySelector('body').style.overflow='hidden'
  document.ontouchmove = function (e) {
    e.preventDefault();
  }
  return state
}

const scrollEnable = state => {
  document.querySelector('body').style.overflow='auto'
  document.ontouchmove = function (e) {}
  return state
}

export default ( state = initialState, action ) => {
  switch(action.type){
    case "PRELOADER_HIDE":
      return preloaderHide(state)
    case "PRELOADER_SHOW":
      return preloaderShow(state)
    case "SCROLL_DISABLE":
      return scrollDisable(state)
    case "SCROLL_ENABLE":
      return scrollEnable(state)
    default:
      return state
  }
}