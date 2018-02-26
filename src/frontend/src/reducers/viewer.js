import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  visible: false,
  content: {
    type: null,
    url: null
  }
})

const viewerShowImage = (state, payload) => {
  const content = {
    type: 'image',
    url: payload.src
  } 
  const visible = true
  let newState = state.set('visible', visible)
  newState = newState.set('content', content)
  return newState
}

export default ( state = initialState, action ) => {
  switch(action.type){
    case "VIEWER_SHOW_IMAGE":
      return viewerShowImage(state, action.payload)
    default:
      return state
  }
}