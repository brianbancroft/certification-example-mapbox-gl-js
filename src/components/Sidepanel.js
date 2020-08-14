import React, { useEffect, useState } from 'react'
import styled from 'styled-components'
import { post } from 'axios'
import { Box, Button, TextInput, Heading, Text } from 'grommet'
import { name, company, random } from 'faker'
import { generateRandomVehicle } from '../helpers'

const SidepanelArea = styled(Box)`
  display: grid;
  grid-template-rows: repeat(auto-fill, 267px);
  grid-row-gap: 10px;
  overflow-y: scroll;
  height: 100%;
`

const Sidepanel = () => {
  const [vehicles, setVehicles] = useState([])
  const [editVehicle, setEditVehicle] = useState(null)

  const vehicleLength = vehicles.length
  const latestVehicle = vehicles[vehicles.length - 1]

  useEffect(() => {
    const getVehicleLocation = async (vehicle) => {
      const response = await post('/.netlify/functions/register-vehicle', {
        id: vehicle.callsign,
      })

      const newVehicle = { ...latestVehicle, ...response.data }
      const newVehicles = vehicles
      newVehicles[newVehicles.length - 1] = newVehicle
      setVehicles(newVehicles)
    }

    if (latestVehicle && !Array.isArray(latestVehicle.location)) {
      getVehicleLocation(latestVehicle)
    }
  }, [vehicleLength])

  const addNewVehicle = () =>
    setVehicles([
      ...vehicles,
      {
        vehicleType: generateRandomVehicle(),
        company: company.companyName(),
        callsign: random.alphaNumeric('4'),
        operator: name.findName(),
      },
    ])

  const VehicleCard = ({ vehicleType, company, callsign, operator }) => (
    <Box
      margin="small"
      border={{ size: 'small', color: 'dark-4' }}
      height="267px"
    >
      <Box background="light-3" pad="small">
        <Heading level="4" margin={{ vertical: 'xxsmall' }}>
          {vehicleType} - {callsign}
        </Heading>
      </Box>
      <Box height="small">
        <Text>Name: {operator}</Text>
        <Text>Company: {company}</Text>
        <img src="https://placekitten.com/g/180/138" />
      </Box>
    </Box>
  )

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
      <Box background="white" fill>
        <SidepanelArea>
          {vehicles.map((vehicle, index) => {
            if (index === editVehicle) {
              return <h1>edit me</h1>
            } else {
              return (
                <VehicleCard
                  {...vehicle}
                  key={`${vehicle.vehicleType}-${vehicle.callsign}`}
                />
              )
            }
          })}
          <Box pad="medium">
            <Button
              primary
              round
              color="accent-3"
              label="Register Vehicle"
              hoverIndicator
              onClick={addNewVehicle}
            />
          </Box>
        </SidepanelArea>
      </Box>
    </Box>
  )
}

export default Sidepanel
