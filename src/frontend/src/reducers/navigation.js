import Immutable from 'immutable'

const initialState = Immutable.fromJS({
  menuIsOpen: false,
  type: 'overlay'
})

const navigationMenuToggle = (state) => {
  return state.set('menuIsOpen', !state.get('menuIsOpen'))
}

export default ( state = initialState, action ) => {
  switch(action.type){
    case "NAVIGATION_MENU_TOGGLE":
      return navigationMenuToggle(state)
    default:
      return state
  }
}