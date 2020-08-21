const defaultState = {
  vehiclesSource: {},
  hoveredVehicle: '',
  ignoredVehicles: [],
}

export default (state = defaultState, action) => {
  let vehiclesSource
  switch (action.type) {
    case 'ADD_TRUCK':
      vehiclesSource = {
        ...state.vehiclesSource,
        [action.truck.callsign]: action.truck,
      }
      return { ...state, vehiclesSource }
    case 'UPDATE_TRUCK':
      vehiclesSource = {
        ...state.vehiclesSource,
        [action.truck.callsign]: action.truck,
      }
      return { ...state, vehiclesSource }
    case 'REMOVE_TRUCK':
      vehiclesSource = state.vehiclesSource
      vehiclesSource[action.id].stop()
      delete vehiclesSource[action.id]
      return { ...state, vehiclesSource }

    case 'SET_HOVERED_VEHICLE':
      return { ...state, hoveredVehicle: action.vehicle }

    case 'SET_IGNORED_VEHICLES':
      return { ...state, ignoredVehicles: action.ignoredVehicles }

    default:
      return state
  }
}
