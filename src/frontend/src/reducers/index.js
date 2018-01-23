import actions from '../actions/'

const initialState = {
  app: {
      loaded: false 
  },
  data: {
      body: {
          content: []
      }
  }
}

export default ( state = initialState, action ) => {
  switch(action.type){
    case "LOAD_APP":
        state.app.loaded = true
        return state
    break
    default:
    return state
  }
}