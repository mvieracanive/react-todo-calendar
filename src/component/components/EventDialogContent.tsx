/**
 * Copyright (c) 2012-present Sedicii Innovations Ltd.
 *
 * All rights reserved.
 */
import { Box, styled } from '@material-ui/core'
import { HeadsetMic } from '@material-ui/icons'
import React from 'react'
import { getFullDate, getFullName } from '../utils/transformers'
import { TaskProps } from './Task'

const StyledBox = styled(Box)({
  display: 'flex',
})

const StyledMicIcon = styled(HeadsetMic)({
  fontSize: '30px',
  color: 'blue',
})

export function EventDialogContent(props: TaskProps) {
  return <StyledBox>
    <StyledMicIcon />
    <Box display={ 'flex' } flexDirection={ 'column' }>
      <h2> { props.title || getFullName(props) } </h2>
      <h4> { getFullDate(props) } </h4>
    </Box>

  </StyledBox>
}
