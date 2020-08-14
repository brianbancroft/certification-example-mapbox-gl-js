const generateRandomVehicle = () => {
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
export default generateRandomVehicle
