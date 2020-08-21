import React, { useEffect, useState } from 'react'
import { Box, FormField, TextInput } from 'grommet'

const SidepanelFilter = ({ disabled, setFilter }) => {
  const [value, setValue] = useState('')

  // Sets filter in parent component on change
  useEffect(() => {
    console.log('Use effect triggered')
    setFilter(value)
  }, [value])

  return (
    <Box
      margin="small"
      border={{ side: 'top', size: 'small', color: 'dark-5' }}
    >
      <FormField label="Filter">
        <TextInput
          value={disabled ? 'Add vehicles to filter' : value}
          disabled={disabled}
          onChange={(e) => setValue(e.target.value)}
          style={{ paddingBottom: '45px' }}
        />
      </FormField>
    </Box>
  )
}

export default SidepanelFilter
