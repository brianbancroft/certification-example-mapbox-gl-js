import React from 'react'
import { useSelector } from 'react-redux'
import SidePanel from './Sidepanel'

const SidepanelWrapper = () => {
  const vehiclesSource = useSelector((state) => state.vehicles.vehiclesSource)

  const vehicles = Object.values(vehiclesSource).map((i) => i.showData())

  return <SidePanel vehicles={vehicles} />
}

export default SidepanelWrapper
