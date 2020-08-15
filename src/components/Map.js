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
  const mapContainer = useRef(null)
  const [basemapStyle, setBasemapStyle] = useState(false)

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

  useEffect(() => {
    if (!map) return
    const loadVehicles = () => {
      const activeLayers = map.getStyle().layers.map((i) => i.id)

      for (let i = 0; i < vehicles.length; i++) {
        let id = `point-${vehicles[i].properties.callsign}`
        if (activeLayers.indexOf(id) !== -1) continue

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

        map.on('mouseenter', id, function (e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = 'pointer'

          var coordinates = e.features[0].geometry.coordinates.slice()
          var vehicleType = e.features[0].properties.vehicleType

          console.log('hi hi hi')

          console.log('Vehicle type ', vehicleType)

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          // }

          // Populate the popup and set its coordinates
          // based on the feature found.
          // popup.setLngLat(coordinates).setHTML(description).addTo(map)
        })

        map.on('mouseleave', id, function () {
          map.getCanvas().style.cursor = ''
          // popup.remove()
        })
      }
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

        map.on('mouseenter', id, function (e) {
          // Change the cursor style as a UI indicator.
          map.getCanvas().style.cursor = 'pointer'

          var coordinates = e.features[0].geometry.coordinates.slice()
          var vehicleType = e.features[0].properties.vehicleType

          console.log('hi hi hi')

          console.log('Vehicle type ', vehicleType)

          // Ensure that if the map is zoomed out such that multiple
          // copies of the feature are visible, the popup appears
          // over the copy being pointed to.
          // while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
          //   coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
          // }

          // Populate the popup and set its coordinates
          // based on the feature found.
          // popup.setLngLat(coordinates).setHTML(description).addTo(map)
        })

        map.on('mouseleave', id, function () {
          map.getCanvas().style.cursor = ''
          // popup.remove()
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
