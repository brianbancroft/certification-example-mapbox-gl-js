import React, { useEffect, useReducer } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { Box, Button, TextInput } from 'grommet'
import {
  addNewTruck,
  removeTruck,
  setSubduedVehicles,
} from '../actions/truckAction'

import SidepanelVehicleCard from './SidepanelVehicleCard'

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
  const setFilter = (e) =>
    localDispatch({ type: 'set-filter-string', filterString: e.target.value })
  const setFilterResults = ({ matches, notMatches }) =>
    localDispatch({ type: 'set-filter-results', matches, notMatches })

  const { matches, notMatches, filterString } = state
  console.log('Filter string ', filterString)

  const dispatch = useDispatch()
  const hideVehicles = (vehicles) => dispatch(setSubduedVehicles(vehicles))
  const { hoveredVehicle } = useSelector((state) => state.vehicles)
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

  const NormalCards = () =>
    vehicles.map((vehicle, index) => {
      return (
        <SidepanelVehicleCard
          {...vehicle}
          key={`${vehicle.vehicleType}-${vehicle.callsign}`}
          deleteTruck={(callsign) => dispatch(removeTruck(callsign))}
          hoveredVehicle={hoveredVehicle}
        />
      )
    })

  const FilteredCards = () =>
    matches.map((vehicle, index) => (
      <SidepanelVehicleCard
        {...vehicle}
        key={`${vehicle.vehicleType}-${vehicle.callsign}-visible`}
        deleteTruck={(callsign) => dispatch(removeTruck(callsign))}
        hoveredVehicle={hoveredVehicle}
      />
    ))

  return (
    <Box
      width="medium"
      background="light-4"
      border={{ side: 'left', size: 'medium' }}
      direction="column"
    >
      <Box heght="small" margin="small">
        <Box>Filter</Box>
        <Box>
          <TextInput
            value={filterString}
            onChange={setFilter}
            disabled={vehicles.length < 2}
          />
        </Box>
      </Box>
      <Box background="white" fill pad={{ bottom: 'small' }}>
        <SidepanelArea>
          {filterString ? <FilteredCards /> : <NormalCards />}
          <Box pad="medium">
            <Button
              primary
              round
              color="accent-3"
              label="Register Vehicle"
              hoverIndicator
              onClick={generateTruck}
            />
          </Box>
        </SidepanelArea>
      </Box>
    </Box>
  )
}

export default Sidepanel
