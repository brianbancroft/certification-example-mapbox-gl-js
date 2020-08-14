import { post } from 'axios'
import { name, company, random } from 'faker'
import { generateRandomVehicle } from '../helpers'
export const addTruck = (truck) => ({
  type: 'ADD_TRUCK',
  truck,
})

export const updateTruck = (truck) => ({
  type: 'UPDATE_TRUCK',
})

export const removeTruck = (id) => ({
  type: 'REMOVE_TRUCK',
  id,
})

export const addNewTruck = async (dispatch) => {
  const vehicle = {
    vehicleType: generateRandomVehicle(),
    company: company.companyName(),
    callsign: random.alphaNumeric('4'),
    operator: name.findName(),
  }

  const response = await post('/.netlify/functions/register-vehicle', {
    id: vehicle.callsign,
  })
  const newVehicle = { ...vehicle, ...response.data }

  return dispatch(addTruck(newVehicle))
}
