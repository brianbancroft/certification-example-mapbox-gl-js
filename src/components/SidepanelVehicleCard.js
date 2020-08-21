import React, { useState } from 'react'
import { Box, Button, Heading, Text } from 'grommet'
import { Close } from 'grommet-icons'
import { useDispatch } from 'react-redux'
import { colorMap } from '../constants/crewTypes'
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
      <Box
        background={colorMap[vehicleType]}
        pad="small"
        direction="row"
        justify="between"
        align="center"
      >
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
        <dl>
          <dt>
            <Heading level="5" margin="xsmall">
              Name
            </Heading>
          </dt>
          <dd>
            <Text>{operator}</Text>
          </dd>
          <dt>
            <Heading level="5" margin="xsmall">
              Company
            </Heading>
          </dt>
          <dd>
            <Text>{company}</Text>
          </dd>
        </dl>
      </Box>
    </Box>
  )
}

export default SidepanelVehicleCard
