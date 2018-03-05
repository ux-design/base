import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  visible: false,
  content: {
    type: null,
    url: null
  }
})

const showImageFullscreen = (state, payload) => {
  const content = {
    type: 'image',
    url: payload.src
  } 
  let newState = state.set('visible', true)
  newState = newState.set('content', content)
  return newState
}

const hideViewer = state => {
  let newState = state.set('visible', false)
  return newState
}

export default ( state = initialState, action ) => {
  switch(action.type){
    case "VIEWER_SHOW_IMAGE_FULLSCREEN":
      return showImageFullscreen(state, action.payload)
    case "VIEWER_HIDE":
      return hideViewer(state)
    default:
      return state
  }
}