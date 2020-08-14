import React from 'react'
import { Box, Header, Main } from 'grommet'

import SidePanelWrapper from './SidepanelWrapper'
import MapContainer from './MapContainer'

const Layout = ({ content }) => {
  return (
    <>
      <Main fill>
        <Header background="brand" height="xxsmall">
          header
        </Header>
        <Box fill direction="row">
          <MapContainer />
          <SidePanelWrapper />
        </Box>
      </Main>
    </>
  )
}

export default Layout
