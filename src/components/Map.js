import React, { useEffect, useRef, useState } from 'react'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components'

import { colorMap } from '../constants/truckTypes'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

const terrainStyle = 'mapbox://styles/brianbancroft/ck2r23wm408me1csue4nbr8zq'
const rasterStyle = 'mapbox://styles/mapbox/satellite-v9'

const MapboxGLMap = ({ vehicles }) => {
  const [map, setMap] = useState(null)
  const [basemapStyle, setBasemapStyle] = useState(terrainStyle)
  const mapContainer = useRef(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_MAP_KEY

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: terrainStyle,
        center: [-112.1038292, 56.7897412],
        zoom: 9.5,
      })

      map.on('load', () => {
        setMap(map)
        map.resize()
      })
    }

    if (!map) initializeMap({ setMap, mapContainer })
  }, [map])

  // Sets map layer switch effect
  useEffect(() => {
    if (!map) return

    map.on('zoomend', async function () {
      const mapZoom = map.getZoom()

      const vectorBasemap = basemapStyle === terrainStyle

      if ((mapZoom > 10 && !vectorBasemap) || (mapZoom <= 10 && vectorBasemap))
        return

      const selectedStyle = mapZoom > 10 ? rasterStyle : terrainStyle
      map.setStyle(selectedStyle)
      setBasemapStyle(selectedStyle)
    })
  }, [map, basemapStyle])

  useEffect(() => {
    if (!map) return
    const loadVehicles = () => {
      for (let i = 0; i < vehicles.length; i++) {
        let id = `point-${vehicles[i].properties.callsign}`

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
            'circle-color': colorMap[vehicles[i].properties.vehicleType],
          },
        })
      }

      console.log(
        'Map layers ',
        map.getStyle().layers.map((i) => i.id),
      )
    }

    setTimeout(loadVehicles, 2000)
  }, [basemapStyle])

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
            'circle-color': colorMap[vehicles[i].properties.vehicleType],
          },
        })
      } else {
        map.getSource(id).setData(vehicles[i])
      }
    }
    // console.log(
    //   'Map layers ',
    //   map.getStyle().layers.map((i) => i.id),
    // )
  }, [map, vehicles])

  // Removes layers from the map
  useEffect(() => {
    if (!map) return
    const activeLayers = map
      .getStyle()
      .layers.map((i) => i.id)
      .filter((i) => /^point-/.test(i))
    const loadedLayers = vehicles.map((i) => `point-${i.properties.callsign}`)

    if (activeLayers.length <= loadedLayers.length) return

    activeLayers.forEach((i) => {
      if (loadedLayers.indexOf(i) !== -1) {
        map.removeLayer(i)
        map.removeSource(i)
      }
    })
  }, [map, vehicles])

  return (
    <MapContainer
      ref={(el) => {
        mapContainer.current = el
      }}
    />
  )
}

export default MapboxGLMap
