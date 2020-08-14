const defaultState = {
  vehiclesArray: [],
  vehiclesSource: {},
}

export default (state = defaultState, action) => {
  let vehiclesSource
  switch (action.type) {
    case 'ADD_TRUCK':
      vehiclesSource = {
        ...state.vehiclesSource,
        [action.truck.callsign]: action.truck,
      }
      return { vehiclesSource, vehiclesArray: Object.values(vehiclesSource) }
    case 'UPDATE_TRUCK':
      vehiclesSource = {
        ...state.vehiclesSource,
        [action.truck.callsign]: action.truck,
      }
      return { vehiclesSource, vehiclesArray: Object.values(vehiclesSource) }
    case 'REMOVE_TRUCK':
      vehiclesSource = state.vehiclesSource
      vehiclesSource[action.id].stop()
      delete vehiclesSource[action.id]
      return { vehiclesSource, vehiclesArray: Object.values(vehiclesSource) }

    default:
      return state
  }
}
