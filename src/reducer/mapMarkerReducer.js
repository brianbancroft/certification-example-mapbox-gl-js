const defaultState = {
  position: [0, 0],
  visible: false,
  mapReady: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'SET_MAP_MARKER':
      return { ...state, position: action.position, visible: true }
    case 'RESET_MAP_MARKER':
      return { ...state, position: [0, 0], visible: false }
    case 'MAP_READY':
      return { ...state, mapReady: true }
    default:
      return state
  }
}
