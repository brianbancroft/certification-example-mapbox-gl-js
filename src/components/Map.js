import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import { composeP } from 'ramda'

const styles = {
  width: '100%',
  height: '100%',
  // position: 'absolute',
}

const MapboxGLMap = ({ vehicles }) => {
  const [map, setMap] = useState(null)
  const [registeredVehices, setRegisteredVehicles] = useState({})
  const mapContainer = useRef(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_MAP_KEY

    const terrainStyle =
      'mapbox://styles/brianbancroft/ck2r23wm408me1csue4nbr8zq'
    const rasterStyle = 'mapbox://styles/mapbox/satellite-v9'

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: terrainStyle,
        center: [-112.1038292, 56.7897412],
        zoom: 8,
      })

      map.on('load', () => {
        setMap(map)
        map.resize()
      })

      map.on('zoomend', function () {
        // TODO: Feed into state, the layer once you add them.
        // debugger

        map.setStyle(map.getZoom() > 10 ? rasterStyle : terrainStyle)
      })
    }

    if (!map) initializeMap({ setMap, mapContainer })
  }, [map])

  // Looks for layers to add to map
  useEffect(() => {
    if (!map) return

    const activeLayers = map.getStyle().layers.map((i) => i.id)

    for (let i = 0; i < vehicles.length; i++) {
      let id = `point-${vehicles[i].properties.callsign}`
      if (activeLayers.indexOf(id) === -1) {
        map.addSource(id, {
          type: 'geojson',
          data: vehicles[i],
        })

        map.addLayer({
          id,
          type: 'circle',
          source: id,
          paint: {
            'circle-radius': 10,
            'circle-color': '#ff00ff',
          },
        })
      } else {
        map.getSource(id).setData(vehicles[i])
      }
    }
  }, [map, vehicles])

  // Looks for layers to remove from map
  useEffect(() => {
    if (!map) return
  }, [map, vehicles])

  return (
    <div
      ref={(el) => {
        mapContainer.current = el
      }}
      style={styles}
    />
  )
}

export default MapboxGLMap
