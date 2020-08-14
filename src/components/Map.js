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
  const mapContainer = useRef(null)

  let waiting = true
  const waitingVehicles = vehicles.filter((i) => i.waiting)
  if (waitingVehicles.length) waiting = false
  console.log('Checking for waiting vehicles ')

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

  useEffect(() => {
    if (waiting) return
    console.log('Map ', map)
    console.log('Vehciles ', vehicles)
    if (map && vehicles.length) {
      setTimeout(() => {
        const vehicle = vehicles[vehicles.length - 1]
        console.log(vehicle)
        // const marker = new mapboxgl.Marker()
        //   .setLngLat(vehicles[vehicles.length - 1].position)
        //   .addTo(map)
      }, 2000)
    }
  }, [map, vehicles, waiting])

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
