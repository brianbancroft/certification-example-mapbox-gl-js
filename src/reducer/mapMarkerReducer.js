const defaultState = {
  position: [0, 0],
  visible: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_MAP_MARKER':
      return { position: action.position, visible: true }
    case 'RESET_MAP_MARKER':
      return { position: [0, 0], visible: false }
    default:
      return state
  }
}
