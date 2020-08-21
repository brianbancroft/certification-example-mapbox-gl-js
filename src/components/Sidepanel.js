import React, { useEffect, useReducer } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Box, Button } from 'grommet'
import {
  addNewTruck,
  removeTruck,
  setSubduedVehicles,
} from '../actions/truckAction'

import SidepanelVehicleCard from './SidepanelVehicleCard'
import SidepanelFilter from './SidepanelFilter'

const SidepanelArea = styled(Box)`
  display: grid;
  grid-template-rows: repeat(auto-fill, 267px);
  grid-row-gap: 10px;
  overflow-y: scroll;
  height: 100%;
`

const initialState = {
  filterString: '',
  matches: [],
  notMatches: [],
}

function reducer(state = initialState, action) {
  switch (action.type) {
    case 'set-filter-string':
      return { ...state, filterString: action.filterString }
    case 'set-filter-results':
      return {
        ...state,
        matches: action.matches,
        notMatches: action.notMatches,
      }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const Sidepanel = ({ vehicles }) => {
  const [state, localDispatch] = useReducer(reducer, initialState)
  const reset = () => localDispatch({ type: 'reset' })
  const setFilter = (filterString) =>
    localDispatch({ type: 'set-filter-string', filterString })
  const setFilterResults = ({ matches, notMatches }) =>
    localDispatch({ type: 'set-filter-results', matches, notMatches })

  const { matches, filterString } = state
  const dispatch = useDispatch()
  const hideVehicles = (vehicles) => dispatch(setSubduedVehicles(vehicles))
  const { hoveredVehicle } = useSelector((state) => state.vehicles)
  const { mapReady } = useSelector((state) => state.mapMarker)
  const generateTruck = () => {
    addNewTruck(dispatch)
  }

  useEffect(() => {
    if (filterString === '') {
      reset()
      hideVehicles([])
    } else {
      const matches = vehicles.filter(
        (i) =>
          i.operator
            .toLocaleLowerCase()
            .includes(filterString.toLocaleLowerCase()) ||
          i.company
            .toLocaleLowerCase()
            .includes(filterString.toLocaleLowerCase()) ||
          i.callsign
            .toLocaleLowerCase()
            .includes(filterString.toLocaleLowerCase()) ||
          i.vehicleType
            .toLocaleLowerCase()
            .includes(filterString.toLocaleLowerCase()),
      )
      const notMatches = vehicles.filter(
        (i) =>
          !(
            i.operator
              .toLocaleLowerCase()
              .includes(filterString.toLocaleLowerCase()) ||
            i.company
              .toLocaleLowerCase()
              .includes(filterString.toLocaleLowerCase()) ||
            i.callsign
              .toLocaleLowerCase()
              .includes(filterString.toLocaleLowerCase()) ||
            i.vehicleType
              .toLocaleLowerCase()
              .includes(filterString.toLocaleLowerCase())
          ),
      )

      hideVehicles(notMatches.map((i) => i.id))

      setFilterResults({ matches, notMatches })
    }
  }, [filterString, vehicles])

  const deleteTruck = (callsign) => {
    const [vehicle] = vehicles.filter((i) => i.callsign === callsign)
    // Stop subsequent polling
    if (!vehicle) return
    vehicle.stop()
    vehicles.splice(vehicle.id, 1)

    dispatch(removeTruck(callsign))
  }

  const NormalCards = () =>
    vehicles.map((vehicle, index) => {
      return (
        <SidepanelVehicleCard
          {...vehicle}
          key={`${vehicle.vehicleType}-${vehicle.callsign}`}
          deleteTruck={deleteTruck}
          hoveredVehicle={hoveredVehicle}
        />
      )
    })

  const FilteredCards = () =>
    matches.map((vehicle, index) => (
      <SidepanelVehicleCard
        {...vehicle}
        key={`${vehicle.vehicleType}-${vehicle.callsign}-visible`}
        deleteTruck={deleteTruck}
        hoveredVehicle={hoveredVehicle}
      />
    ))

  return (
    <Box
      width="medium"
      background="light-4"
      border={{ side: 'left', size: 'medium' }}
      direction="column"
      height="fill"
    >
      <SidepanelFilter disabled={vehicles.length < 2} setFilter={setFilter} />
      <Box background="white" pad={{ bottom: 'small' }} fill>
        <SidepanelArea fill>
          {filterString ? <FilteredCards /> : <NormalCards />}
        </SidepanelArea>
        <Box pad="medium">
          <Button
            primary
            color="neutral-1"
            label={
              <>
                Add New Vehicle <br />
                {vehicles.length} / 10
              </>
            }
            disabled={!mapReady || vehicles.length >= 10}
            hoverIndicator
            onClick={generateTruck}
          />
        </Box>
      </Box>
    </Box>
  )
}

export default Sidepanel
