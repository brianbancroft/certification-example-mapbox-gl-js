export const setMarker = (position) => ({
  type: 'SET_MAP_MARKER',
  position,
})

export const resetMarker = () => ({
  type: 'RESET_MAP_MARKER',
})
