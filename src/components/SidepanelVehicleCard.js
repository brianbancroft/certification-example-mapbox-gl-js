import React, { useState } from 'react'
import { Box, Button, TextInput, Heading, Text } from 'grommet'
import { Close } from 'grommet-icons'
import { useDispatch } from 'react-redux'
import { colorMap } from '../constants/truckTypes'
import { setHoveredVehicle } from '../actions/truckAction'

const SidepanelVehicleCard = ({
  vehicleType,
  company,
  callsign,
  operator,
  deleteTruck,
  hoveredVehicle,
}) => {
  const [borderWidth, setBorderWidth] = useState('small')
  const dispatch = useDispatch()
  const setHover = (id) => dispatch(setHoveredVehicle(id))

  console.log('Hovered vehicle ', hoveredVehicle)

  return (
    <Box
      margin="small"
      border={{
        size: callsign === hoveredVehicle ? 'medium' : borderWidth,
        color: 'dark-4',
      }}
      height="267px"
      onMouseEnter={() => {
        setHover(callsign)
        setBorderWidth('medium')
      }}
      onMouseLeave={() => {
        setHover('')
        setBorderWidth('small')
      }}
    >
      <Box background={colorMap[vehicleType]} pad="small">
        <Box>
          <Heading level="4" margin={{ vertical: 'xxsmall' }}>
            {vehicleType} - {callsign}
          </Heading>
        </Box>
        <Box>
          <Button icon={<Close />} onClick={() => deleteTruck(callsign)} />
        </Box>
      </Box>
      <Box height="small">
        <Text>Name: {operator}</Text>
        <Text>Company: {company}</Text>
      </Box>
    </Box>
  )
}

export default SidepanelVehicleCard
