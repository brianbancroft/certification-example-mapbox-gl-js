const defaultState = []

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'ADD_TRUCK':
      return [...state, action.truck]
    case 'UPDATE_TRUCKS':
      return state
    case 'REMOVE_TRUCK':
      state.splice(action.index, 1)
      return state

    default:
      return state
  }
}
