import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { post } from 'axios'
import { Box, Button, TextInput, Heading, Text } from 'grommet'
import { Close } from 'grommet-icons'
import { addNewTruck, removeTruck } from '../actions/truckAction'

import SidepanelVehicleCard from './SidepanelVehicleCard'

const SidepanelArea = styled(Box)`
  display: grid;
  grid-template-rows: repeat(auto-fill, 267px);
  grid-row-gap: 10px;
  overflow-y: scroll;
  height: 100%;
`

const Sidepanel = ({ vehicles }) => {
  const dispatch = useDispatch()
  const { hoveredVehicle } = useSelector((state) => state.vehicles)
  const generateTruck = () => {
    addNewTruck(dispatch)
  }

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
          <TextInput />
        </Box>
      </Box>
      <Box background="white" fill pad={{ bottom: 'small' }}>
        <SidepanelArea>
          {vehicles.map((vehicle, index) => {
            return (
              <SidepanelVehicleCard
                {...vehicle}
                key={`${vehicle.vehicleType}-${vehicle.callsign}`}
                deleteTruck={(callsign) => dispatch(removeTruck(callsign))}
                hoveredVehicle={hoveredVehicle}
              />
            )
          })}
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
