import { name, company as fakerCompany, random } from 'faker'
import { generateRandomVehicle } from '../helpers'
import { post } from 'axios'
import store from '../reducer/store'
import { updateTruck } from '../actions/truckAction'

class Vehicle {
  constructor({ vehicleType, company, callsign, operator } = {}) {
    const getInitialCoordinates = async () => {
      const response = await post('/.netlify/functions/register-vehicle', {
        id: this.callsign,
      })

      this.#position = response.data.position
      this.#thetaOffset = response.data.thetaOffset
      this.#radialModifier = response.data.radialModifier
      this.loading = false

      const { dispatch } = store
      dispatch(updateTruck(this))
    }

    this.#vehicleType = vehicleType ?? generateRandomVehicle()
    this.#company = company ?? fakerCompany.companyName()
    this.callsign = callsign ?? random.alphaNumeric(4)
    this.#operator = operator ?? name.findName()

    getInitialCoordinates().then(this.#startTracking)
  }

  #position = [0, 0]
  #thetaOffset = null
  #radialModifier = null
  #vehicleType = null
  #company = null
  callsign = null
  #operator = null
  loading = true
  error = false
  #continue = true

  #updateLocation = async () => {
    if (!this.#continue) return
    const response = await post('/.netlify/functions/ping-vehicle', {
      id: this.callsign,
      radialModifier: this.#radialModifier,
      thetaOffset: this.#thetaOffset,
    }).catch((e) => {
      this.error = true
      console.error(
        'Error in updating vehicle tracking. Ceasing tracking for this vehicle',
      )
      console.error(e)
    })

    this.#position = response.data.position
    const { dispatch } = store
    dispatch(updateTruck(this))
  }

  #updateFrequency = 1000 * 15 // 15s

  #startTracking = () => {
    setInterval(this.#updateLocation, this.#updateFrequency)
  }

  showData = () => ({
    vehicleType: this.#vehicleType,
    company: this.#company,
    callsign: this.callsign,
    operator: this.#operator,
    position: this.#position,
    loading: this.loading,
  })

  geojson = () => ({
    type: 'Feature',
    properties: {
      callsign: this.callsign,
      vehicleType: this.#vehicleType,
      operator: this.#operator,
    },
    geometry: {
      type: 'Point',
      coordinates: this.#position,
    },
  })

  stop = () => {
    this.continue = false
  }
}

export default Vehicle
