import React from 'react'
import { render } from '@testing-library/react'
import SidepanelVehicleCard from '../SidepanelVehicleCard'
import { Provider } from 'react-redux'
import store from '../../reducer/store'

test('it renders', () => {
  const { getByLabelText, getByRole, rerender, debug } = render(
    <Provider store={store}>
      <SidepanelVehicleCard />
    </Provider>,
  )

  debug()
})
