import React, { useEffect, useState } from 'react'

import { useDispatch, useSelector } from 'react-redux'
import styled from 'styled-components'
import { post } from 'axios'
import { Box, Button, TextInput, Heading, Text } from 'grommet'
import { Close } from 'grommet-icons'
import { addNewTruck, removeTruck } from '../actions/truckAction'

const SidepanelArea = styled(Box)`
  display: grid;
  grid-template-rows: repeat(auto-fill, 267px);
  grid-row-gap: 10px;
  overflow-y: scroll;
  height: 100%;
`

const Sidepanel = ({ vehicles }) => {
  const dispatch = useDispatch()

  const generateTruck = () => {
    addNewTruck(dispatch)
  }

  const VehicleCard = ({ vehicleType, company, callsign, operator }) => {
    const deleteTruck = () => dispatch(removeTruck(callsign))
    return (
      <Box
        margin="small"
        border={{ size: 'small', color: 'dark-4' }}
        height="267px"
      >
        <Box background="light-3" pad="small">
          <Box>
            <Heading level="4" margin={{ vertical: 'xxsmall' }}>
              {vehicleType} - {callsign}
            </Heading>
          </Box>
          <Box>
            <Button icon={<Close />} onClick={deleteTruck} />
          </Box>
        </Box>
        <Box height="small">
          <Text>Name: {operator}</Text>
          <Text>Company: {company}</Text>
        </Box>
      </Box>
    )
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
              <VehicleCard
                {...vehicle}
                key={`${vehicle.vehicleType}-${vehicle.callsign}`}
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
