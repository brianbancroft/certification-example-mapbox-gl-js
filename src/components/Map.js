import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'

const styles = {
  width: '100%',
  height: '100%',
  // position: 'absolute',
}

const MapboxGLMap = () => {
  const [map, setMap] = useState(null)
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
        center: [0, 0],
        zoom: 5,
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
