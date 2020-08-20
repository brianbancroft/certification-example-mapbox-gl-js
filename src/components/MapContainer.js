import React from 'react'
import { Box } from 'grommet'
import { useSelector } from 'react-redux'
import Map from './Map'

/*
  Map Container fills the map area with the map.

*/
const MapContainer = () => {
  const geojson = {
    type: 'FeatureCollection',
    features: [],
  }

  const vehiclesSource = useSelector((state) => state.vehicles.vehiclesSource)
  geojson.features = Object.values(vehiclesSource).map((i) => i.geojson())

  return (
    <Box fill>
      <Map geojson={geojson} />
    </Box>
  )
}

export default MapContainer
