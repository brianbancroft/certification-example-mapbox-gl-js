import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import styled from 'styled-components'
import { Box, Button, Text } from 'grommet'
import { Checkmark, Close, Copy } from 'grommet-icons'

import { resetMarker } from '../actions/mapMarkerAction'

const width = '300px'
const height = '180px'
const padding = '20px'

const PanelElement = styled.div`
  position: fixed;
  width: ${width};
  height: ${height};
  /* top: calc(50% - (${height} / 2)); */
  bottom: 20px;
  left: calc(50% - (${width}  / 2) - ${padding});
  padding: ${padding};

  input {
    width: 200px;
  }
`

function copyText(id) {
  /* Get the text field */
  if (!document) return
  var copyText = document && document.getElementById(id)
  /* Select the text field */
  copyText.select()
  copyText.setSelectionRange(0, 99999) /*For mobile devices*/

  /* Copy the text inside the text field */
  document && document.execCommand('copy')
}

function decimalDegreeToDmsString(deg) {
  var d = Math.floor(deg)
  var minfloat = (deg - d) * 60
  var m = Math.floor(minfloat)
  var secfloat = (minfloat - m) * 60
  var s = Math.round(secfloat)
  // After rounding, the seconds might become 60. These two
  // if-tests are not necessary if no rounding is done.
  if (s === 60) {
    m++
    s = 0
  }
  if (m === 60) {
    d++
    m = 0
  }
  return '' + d + '°:' + m + "':" + s + '"'
}

/*
  A panel used for displaying information on an active html marker on the map
*/
const MarkerPanel = () => {
  const [check1, setCheck1] = useState(false)
  const [check2, setCheck2] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      if (check1) setCheck1(false)
    }, 2500)
  }, [check1])

  useEffect(() => {
    setTimeout(() => {
      if (check2) setCheck2(false)
    }, 2500)
  }, [check2])

  const dispatch = useDispatch()
  const closeMarkerPanel = () => {
    dispatch(resetMarker())
  }

  const { visible, position } = useSelector((state) => state.mapMarker)

  if (!visible) return <></>

  return (
    <PanelElement>
      <Box
        background="light-2"
        border={{ size: 'small', color: 'dark-2' }}
        fill
      >
        <Box
          className="closing-row"
          direction="row"
          justify="between"
          align="center"
        >
          <Box pad={{ left: 'medium' }}>
            <Text weight="bold">Active Marker Summary</Text>
          </Box>
          <Button icon={<Close onClick={closeMarkerPanel} />} />
        </Box>
        <Box pad={{ left: 'small', right: 'small' }}>
          <dl>
            <dt>
              <Text size="small">Degrees Minutes Seconds</Text>
            </dt>
            <dd>
              <Box direction="row" justify="between">
                <Text size="xsmall">
                  <input
                    value={`${decimalDegreeToDmsString(
                      position[0],
                    )} E, ${decimalDegreeToDmsString(position[1])} N`}
                    id="latLngDegreeMinuteSecond"
                  />
                </Text>
                <Box>
                  {check1 ? (
                    <Checkmark
                      onClick={() => {
                        setCheck1(true)
                        copyText('latLngDegreeMinuteSecond')
                      }}
                    />
                  ) : (
                    <Copy
                      onClick={() => {
                        setCheck1(true)
                        copyText('latLngDegreeMinuteSecond')
                      }}
                    />
                  )}
                </Box>
              </Box>
            </dd>
            <dt>
              <Text size="small">Decimal Degrees (Long Lat)</Text>
            </dt>
            <dd>
              <Box direction="row" justify="between">
                <Text size="xsmall">
                  <input
                    value={`${String(position[0]).slice(0, 7)}, ${String(
                      position[1],
                    ).slice(0, 7)}`}
                    id="latLngDecDegrees"
                  />
                </Text>
                <Box>
                  {check2 ? (
                    <Checkmark
                      onClick={() => {
                        setCheck2(true)
                        copyText('latLngDecDegrees')
                      }}
                    />
                  ) : (
                    <Copy
                      onClick={() => {
                        setCheck2(true)
                        copyText('latLngDecDegrees')
                      }}
                    />
                  )}
                </Box>
              </Box>
            </dd>
          </dl>
        </Box>
      </Box>
    </PanelElement>
  )
}

export default MarkerPanel
