import React from 'react'
import { Box } from 'grommet'
import { useSelector } from 'react-redux'
import Map from './Map'

/*
  Map Container fills the map area with the map.

*/
const MapContainer = () => {
  const vehicles = useSelector(
    (state) => state.vehicles.vehiclesArray,
  ).map((vehicle) => vehicle.geojson())

  return (
    <Box fill>
      <Map vehicles={vehicles} />
    </Box>
  )
}

export default MapContainer
