import React from 'react'
import { Box, Header, Heading, Link, Main } from 'grommet'

import SidePanelWrapper from './SidepanelWrapper'
import MapContainer from './MapContainer'
import MarkerPanel from './MarkerPanel'

const Layout = ({ content }) => {
  return (
    <>
      <Main fill>
        <Header
          background="brand"
          height="xxsmall"
          pad={{ horizontal: 'medium' }}
          justify="between"
        >
          <Heading>Realtime Tracking Example</Heading>
          <Box>
            <a
              href="https://sparkgeo.com"
              target="_blank"
              rel="noreferer_noopener"
            >
              Questions? Ask us
            </a>
          </Box>
        </Header>
        <Box fill direction="row">
          <MapContainer />
          <SidePanelWrapper />
          <MarkerPanel />
        </Box>
      </Main>
    </>
  )
}

export default Layout
