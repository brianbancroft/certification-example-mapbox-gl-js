import React, { useEffect, useRef, useState } from 'react'

import { get } from 'axios'
import mapboxgl from 'mapbox-gl'
import 'mapbox-gl/dist/mapbox-gl.css'
import styled from 'styled-components'
import { useDispatch } from 'react-redux'
import { setHoveredVehicle } from '../actions/truckAction'
import { setMarker, mapReady } from '../actions/mapMarkerAction'
import { mapboxColourExpression } from '../constants/crewTypes'

const MapContainer = styled.div`
  width: 100%;
  height: 100%;
`

const terrainStyle = 'mapbox://styles/brianbancroft/ck2r23wm408me1csue4nbr8zq'
const rasterStyle = 'mapbox://styles/mapbox/satellite-v9'

// Generates HTML For mapbox popup
const generatepopup = ({ callsign, vehicleType, message, type }) => {
  return `<div class="${type}"><div><strong>New ${type} from callsign ${callsign}</strong></div><div class="content-paper">${message}</div></div>`
}

// Restricts panning extent for the map
const maxBounds = [
  [-118.93, 54.6737], // Southwest coordinates
  [-106.75, 58.5824], // Northeast coordinates
]

let marker
const MapboxGLMap = ({
  ignoredVehicles,
  geojson,
  hoveredVehicle,
  mapMarkerVisible,
}) => {
  const [map, setMap] = useState(null)
  const mapContainer = useRef(null)
  const [popup, setPopup] = useState(null)
  const dispatch = useDispatch()
  const setHover = (id) => dispatch(setHoveredVehicle(id))
  const setMapMarker = ({ lng, lat }) => dispatch(setMarker([lng, lat]))
  const setMapReady = () => dispatch(mapReady())

  useEffect(() => {
    mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_MAP_KEY

    const initializeMap = ({ setMap, mapContainer }) => {
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: terrainStyle,
        center: [-112.1038292, 56.7897412],
        zoom: 7,
        maxBounds,
      })

      map.on('load', () => {
        setMap(map)
        map.resize()
        setMapReady()
      })

      map.on('click', ({ lngLat: center }) => {
        map.flyTo({ center })
      })

      map.on('click', function (e) {
        // Remove existing markers

        console.log('existing marker ', marker)
        if (marker) {
          marker.setLngLat(e.lngLat)
        } else {
          marker = new mapboxgl.Marker().setLngLat(e.lngLat).addTo(map)
        }
        setMapMarker(e.lngLat)
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

  // Sets changes to map layers for ignored vehicles
  useEffect(() => {
    if (!map || geojson.features.length === 0) return

    geojson.features.forEach((feature) => {
      if (ignoredVehicles.indexOf(feature.id) !== -1) {
        map.setFeatureState(
          { source: 'vehicles', id: feature.id },
          { ignore: true },
        )
      } else {
        map.setFeatureState(
          { source: 'vehicles', id: feature.id },
          { ignore: false },
        )
      }
    })
  }, [ignoredVehicles, geojson])

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
        'circle-stroke-color': '#222',
        'circle-opacity': [
          'case',
          ['boolean', ['feature-state', 'ignore'], true],
          0.05,
          1,
        ],
        'circle-stroke-width': [
          'case',
          ['boolean', ['feature-state', 'hover'], false],
          2,
          0.5,
        ],
        'circle-color': [
          'case',
          ['boolean', ['feature-state', 'ignore'], true],
          '#555',
          mapboxColourExpression,
        ],
      },
    })

    let hoverFeatureId

    map.on('mouseenter', 'vehicles', async function (e) {
      console.log('Mouse enter triggered')

      map.getCanvas().style.cursor = 'pointer'
      if (e.features.length > 0) {
        if (hoverFeatureId) {
          console.log('Setting hover feature id false')
          map.setFeatureState(
            { source: 'vehicles', id: hoverFeatureId },
            { hover: false },
          )
        }

        hoverFeatureId = e.features[0].id
        console.log('Setting hover feature id true')
        map.setFeatureState(
          { source: 'vehicles', id: hoverFeatureId },
          { hover: true },
        )
        const { callsign } = e.features[0].properties
        setHover(callsign)
      }

      var coordinates = e.features[0].geometry.coordinates.slice()
      var { callsign, vehicleType } = e.features[0].properties

      while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
        coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360
      }

      const {
        data: { message, type },
      } = await get(`/.netlify/functions/latest-message?callsign=${callsign}`)

      // Populate the popup and set its coordinates
      // based on the feature found.
      popup
        .setLngLat(coordinates)
        .setHTML(generatepopup({ callsign, vehicleType, message, type }))
        .addTo(map)
    })

    map.on('mouseleave', 'vehicles', function () {
      map.getCanvas().style.cursor = ''

      // Doing a single leave is not always reliable
      geojson.features.forEach(({ id }) => {
        map.setFeatureState({ source: 'vehicles', id }, { hover: false })
      })
      setHover('')
    })
  }, [map, geojson])

  // Updates vehicles
  useEffect(() => {
    if (!map) return
    if (!map.getSource('vehicles')) return

    // popup.remove()

    map.getSource('vehicles').setData(geojson)
  }, [map, geojson])

  // Sets hover effect on marker if sidepanel vehicle hovered over
  useEffect(() => {
    if (!map) return

    if (hoveredVehicle) {
      geojson.features.forEach((feature) => {
        if (feature.properties.callsign === hoveredVehicle) {
          map.setFeatureState(
            {
              source: 'vehicles',
              id: feature.id,
            },
            { hover: true },
          )
        }
      })
    } else {
      geojson.features.forEach(({ id }) => {
        map.setFeatureState({ source: 'vehicles', id }, { hover: false })
      })
    }
  }, [hoveredVehicle])

  // Removes map marker if stripped by "x" button
  useEffect(() => {
    if (!map || !marker || mapMarkerVisible) return
    marker.remove()
    marker = null
  }, [mapMarkerVisible])

  return (
    <MapContainer
      ref={(el) => {
        mapContainer.current = el
      }}
    />
  )
}

export default MapboxGLMap
