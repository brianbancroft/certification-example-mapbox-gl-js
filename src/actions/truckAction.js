export const addTruck = ({ name, type, callsign, operator, company }) => ({
  type: 'ADD_TRUCK',
})

export const updateTruck = ({
  id,
  name,
  type,
  callsign,
  operator,
  company,
}) => ({
  type: 'UPDATE_TRUCK',
})

export const updateTrucks = (trucks) => {
  // TODO: Verify content of trucks

  // TODO: raise error if not properly-serialized

  return {
    trucks,
    type: 'UPDATE_TRUCKS',
  }
}

export const removeTruck = (id) => ({
  type: 'REMOVE_TRUCK',
  id,
})
