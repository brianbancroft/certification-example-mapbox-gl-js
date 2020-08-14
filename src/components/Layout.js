import React from 'react'
import { Box, Header, Main, Footer } from 'grommet'

import SidePanel from './Sidepanel'
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
          <SidePanel />
        </Box>
      </Main>
    </>
  )
}

export default Layout
