const defaultState = {
  mapLayers: [],
  boundingBox: null,
  downloadAreaKmSq: 0,
  layersMenuOpen: false,
  downloadMenuOpen: false,
}

export default (state = defaultState, action) => {
  switch (action.type) {
    case 'RESET_MAP':
      return defaultState
    case 'SET_DOWNLOAD_AREA':
      return { ...state, downloadAreaKmSq: action.area }
    case 'TOGGLE_LAYERS_MENU':
      return { ...state, layersMenuOpen: !state.layersMenuOpen }
    case 'TOGGLE_DOWNLOAD_MENU':
      return { ...state, downloadMenuOpen: !state.downloadMenuOpen }
    case 'ADD_MAP_LAYER':
      return { ...state, mapLayers: [...state.mapLayers, action.mapLayer] }
    case 'ADJUST_MAP_LAYERS':
      return { ...state, mapLayers: action.mapLayers }

    default:
      return state
  }
}
