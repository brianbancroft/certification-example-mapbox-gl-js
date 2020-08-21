import vehicleTypes from '../constants/crewTypes'

const generateRandomVehicle = () =>
  vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]

export default generateRandomVehicle
