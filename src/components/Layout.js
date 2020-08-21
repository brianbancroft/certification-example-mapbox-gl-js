// prettier-disable
import React, { useState } from 'react'
import { Box, Button, Header, Heading, Layer, Main, Text } from 'grommet'

import SidePanelWrapper from './SidepanelWrapper'
import MapContainer from './MapContainer'
import MarkerPanel from './MarkerPanel'

const Layout = ({ content }) => {
  const [viewLayer, setViewLayer] = useState(false)

  const ModalContent = () => (
    <Layer
      onEsc={() => setViewLayer(false)}
      onClickOutside={() => setViewLayer(false)}
    >
      <Box width="medium" pad="small">
        <Box><Heading level="3" margin={{top: 'small', bottom: 'medium'}}>Mapbox Dashboard Example</Heading></Box>
        <Box>
          This is a example for the Mapbox Partner Certification project. It
          demonstrates a bare-bones vehicle tracking dashboard.
        </Box>
        <Box margin={{vertical: 'small'}} pad={{horizontal: 'small'}}>
          <Text size="small">
            Do you have questions, or want to have something similar?{' '}<a
              href="https://bancroft.io/contact"
              target="_blank"
              rel="noopener noreferrer"
            >Ask me personally</a>, or contact <a
              href="https://sparkgeo.com"
              target="_blank"
              rel="noopener noreferrer"
            >Sparkgeo</a>. We provide geospatial expertise to tech companies.
          </Text>
        </Box>
        <Box>
          <Button label="close" onClick={() => setViewLayer(false)} />
        </Box>
      </Box>
    </Layer>
  )

  return (
    <>
      {viewLayer && <ModalContent />}
      <Main fill>
        <Header
          background="brand"
          height="xsmall"
          pad={{ horizontal: 'medium', vertical: 'small' }}
          justify="between"
        >
          <Heading level="2">Vehicle Status Dashboard</Heading>
          <Box>
            <Button label="learn more" onClick={() => setViewLayer(true)} />
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
