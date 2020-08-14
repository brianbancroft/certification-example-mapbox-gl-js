import React from 'react'
import { Box } from 'grommet'
import { useSelector } from 'react-redux'
import Map from './Map'

/*
  Map Container fills the map area with the map.

*/
const MapContainer = () => {
  // const vehicles = useSelector((state) => state.vehicles).map((vehicle) =>
  //   vehicle.showData(),
  // )
  const vehicles = []

  return (
    <Box fill>
      <Map vehicles={vehicles} />
    </Box>
  )
}

export default MapContainer
