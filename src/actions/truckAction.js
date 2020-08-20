import Vehicle from '../classes/Vehicle'

export const addTruck = (truck) => ({
  type: 'ADD_TRUCK',
  truck,
})

export const updateTruck = (truck) => ({
  type: 'UPDATE_TRUCK',
  truck,
})

export const removeTruck = (id) => ({
  type: 'REMOVE_TRUCK',
  id,
})

export const setHoveredVehicle = (vehicle) => ({
  type: 'SET_HOVERED_VEHICLE',
  vehicle,
})

export const addNewTruck = async (dispatch) => {
  const vehicle = new Vehicle({})

  return dispatch(addTruck(vehicle))
}
