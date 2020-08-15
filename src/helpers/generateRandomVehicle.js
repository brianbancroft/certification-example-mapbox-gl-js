import vehicleTypes from '../constants/truckTypes'

const generateRandomVehicle = () =>
  vehicleTypes[Math.floor(Math.random() * vehicleTypes.length)]

export default generateRandomVehicle
