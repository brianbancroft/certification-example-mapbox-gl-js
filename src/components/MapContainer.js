import React from 'react'
import { Box } from 'grommet'
import Map from './Map'

/*
  Map Container fills the map area with the map.

*/
const MapContainer = () => {
  return (
    <Box fill>
      <Map />
    </Box>
  )
}

export default MapContainer
