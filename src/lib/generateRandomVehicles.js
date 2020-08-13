import { pipe } from 'ramda'
import { name, company, random } from 'faker'
import { times } from 'lodash'

import { calculateX, calculateY } from '../helpers'

const generateTheta = () => (Date.now() / 3600) % 360 // (0, θ, 360]
const generateRandomOffset = () => Math.floor(Math.random() * 720 + 1) - 360 // (-360, δθ, 360)
const radialModifier = () => (Math.floor(Math.random() * 50 + 1) + 50) / 100 // (0.5, δr, 1)

function offsetTheta(theta, offset) {
  if (theta + offset > 360) {
    return theta + offset - 360
  } else if (theta + offset < 0) {
    return 360 + theta + offset
  } else {
    return theta + offset
  }
}

const getVehicleOffsettedThetaHof = ({ theta }) => (vehicle) => ({
  ...vehicle,
  theta: offsetTheta(theta, vehicle.thetaOffset),
})

const serializeOutput = ({ position, name, company, callsign, operator }) => ({
  position,
  name,
  company,
  callsign,
  operator,
})

const generatePositionHof = (coreData) => (vehicle) => {
  const { theta, radialModifier } = vehicle

  const {
    xmin: initialxmin,
    xmax: initialxmax,
    ymin: initialymin,
    ymax: initialymax,
  } = coreData

  const xRadius = (initialxmax - initialxmin) / 2
  const yRadius = (initialymax - initialymin) / 2
  const centerPointx = initialxmin + xRadius
  const centerPointy = initialymin + yRadius

  const xmin = centerPointx - xRadius * radialModifier
  const xmax = centerPointx + xRadius * radialModifier
  const ymin = centerPointy - yRadius * radialModifier
  const ymax = centerPointy + yRadius * radialModifier

  return {
    ...vehicle,
    position: [
      calculateX({
        theta,
        xmin,
        xmax,
      }),
      calculateY({ theta, ymin, ymax }),
    ],
  }
}

const randomVehicle = () => {
  const vehicleTypes = [
    'ATV',
    'Mulcher',
    'Pickup',
    'Rock Truck',
    'Saw Crew',
    'Water Truck',
    'Vac Truck',
    'Plow',
    'Excavator',
  ]

  return vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]
}

const generateRandomVehicle = () => ({
  name: randomVehicle(),
  company: company.companyName(),
  callsign: random.alphaNumeric('4'),
  thetaOffset: generateRandomOffset(),
  radialModifier: radialModifier(),
  operator: name.findName(),
})

const generateNumberVehicles = (number) => times(number, generateRandomVehicle)

const vehicles = [
  {
    name: randomVehicle(),
    company: company.companyName(),
    callsign: 'AE-12',
    thetaOffset: generateRandomOffset(),
    radialModifier: radialModifier(),
    operator: name.findName(),
  },
  {
    name: randomVehicle(),
    company: company.companyName(),
    callsign: 'BR-124',
    thetaOffset: generateRandomOffset(),
    radialModifier: radialModifier(),
    operator: name.findName(),
  },
]

const coreData = {
  xmin: -112.104973,
  ymin: 56.788894,
  xmax: -112.073994,
  ymax: 56.804951,
  theta: generateTheta(),
}

const getVehicleOffsettedTheta = getVehicleOffsettedThetaHof(coreData)
const generateVehiclePosition = generatePositionHof(coreData)

const vehicleResp = generateNumberVehicles(6).map(
  pipe(getVehicleOffsettedTheta, generateVehiclePosition, serializeOutput),
)

console.log('Vehicle response ', vehicleResp)
