const defaultState = {}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TRUCK':
      return { ...state, [action.truck.callsign]: action.truck }
    case 'UPDATE_TRUCK':
      return { ...state, [action.truck.callsign]: action.truck }
    case 'REMOVE_TRUCK':
      delete state[action.id]
      return state

    default:
      return state
  }
}
