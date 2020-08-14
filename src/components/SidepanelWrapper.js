import React from 'react'
import { useSelector } from 'react-redux'
import SidePanel from './Sidepanel'

const SidepanelWrapper = () => {
  const vehicles = useSelector(
    (state) => state.vehicles.vehiclesArray,
  ).map((i) => i.showData())

  return <SidePanel vehicles={vehicles} />
}

export default SidepanelWrapper
