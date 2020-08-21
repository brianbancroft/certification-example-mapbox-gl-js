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
  const { hoveredVehicle } = useSelector((state) => state.vehicles)
  const { visible: mapMarkerVisible } = useSelector((state) => state.mapMarker)

  geojson.features = Object.values(vehiclesSource).map((i, id) => ({
    ...i.geojson(),
    id,
  }))

  return (
    <Box fill>
      <Map
        geojson={geojson}
        hoveredVehicle={hoveredVehicle}
        mapMarkerVisible={mapMarkerVisible}
      />
    </Box>
  )
}

export default MapContainer
