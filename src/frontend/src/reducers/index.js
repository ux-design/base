import actions from '../actions/'

const initialState = {
  app: {
      loaded: false,
      route: null
  },
  content: null
}

export default ( state = initialState, action ) => {
  switch(action.type){
    case "UPDATE_CONTENT":
        state.content = action.payload
        break
  }
  return state
}