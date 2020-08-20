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

const MapboxGLMap = ({ geojson }) => {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)
  const [sourceData, setSourceData] = useState({})
  const [basemapStyle, setBasemapStyle] = useState(false)
  const [popup, setPopup] = useState(null)

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_MAP_KEY

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: terrainStyle,
        center: [-112.1038292, 56.7897412],
        zoom: 7,
      })

      map.on('load', () => {
        setMap(map)
        map.resize()
      })

      map.on('click', ({ lngLat: center }) => {
        map.flyTo({ center })
      })

      setPopup(
        new mapboxgl.Popup({
          closeButton: true,
          closeOnClick: false,
        }),
      )
    }

    if (!map) initializeMap({ setMap, mapContainer })
  }, [map])

  // Sets map layer switch effect
  useEffect(() => {
    if (!map) return

    map.on('zoomend', async function () {
      const mapZoom = map.getZoom()

      const vectorBasemap =
        map
          .getStyle()
          .layers.map((i) => i.id)
          .indexOf('crop') !== -1

      if ((mapZoom > 10 && !vectorBasemap) || (mapZoom <= 10 && vectorBasemap))
        return

      const selectedStyle = mapZoom > 10 ? rasterStyle : terrainStyle
      map.setStyle(selectedStyle)
      setBasemapStyle(selectedStyle)
    })
  }, [map])

  // Set source and style when first layer added
  useEffect(() => {
    if (!map) return

    if (map.getSource('vehicles') || geojson.features.length !== 1) return

    const baseData = {
      type: 'geojson',
      data: geojson,
    }

    map.addSource('vehicles', baseData)
    map.addLayer({
      id: 'vehicles',
      type: 'circle',
      source: 'vehicles',
      filter: ['has', 'vehicleType'],
      paint: {
        'circle-radius': 10,
        'circle-color': [
          'case',
          ['==', ['get', 'vehicleType'], 'ATV'],
          '#8dd3c7',
          ['==', ['get', 'vehicleType'], 'Mulcher'],
          '#ffffb3',
          ['==', ['get', 'vehicleType'], 'Pickup'],
          '#bebada',
          ['==', ['get', 'vehicleType'], 'Rock Truck'],
          '#fb8072',
          ['==', ['get', 'vehicleType'], 'Saw Crew'],
          '#80b1d3',
          ['==', ['get', 'vehicleType'], 'Water Truck'],
          '#fdb462',
          ['==', ['get', 'vehicleType'], 'Vac Truck'],
          '#b3de69',
          ['==', ['get', 'vehicleType'], 'Plow'],
          '#fccde5',
          ['==', ['get', 'vehicleType'], 'Excavator'],
          '#bc80bd',
          ['==', ['get', 'vehicleType'], 'Grater'],
          '#ccebc5',
          // One should never get red. Red bad.
          '#ff0000',
        ],
      },
    })
  }, [map, geojson])

  // Updates vehicles
  useEffect(() => {
    if (!map) return
    if (!map.getSource('vehicles')) return

    map.getSource('vehicles').setData(geojson)
  }, [map, geojson])

  useEffect(() => {
    if (map && sourceData.data.length > 0) {
    } else console.log('Nothing in  map or sourceData ', map, sourceData.data)
  }, [sourceData])

  return (
    <MapContainer
      ref={(el) => {
        mapContainer.current = el
      }}
    />
  )
}

export default MapboxGLMap
