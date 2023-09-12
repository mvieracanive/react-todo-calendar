/**
 * Copyright (c) 2012-present Sedicii Innovations Ltd.
 *
 * All rights reserved.
 */
import { Box, Popover, Typography, styled } from '@material-ui/core'
import { HeadsetMic } from '@material-ui/icons'
import React, { SyntheticEvent, useState } from 'react'
import { EventProps } from '../EventCalendar'
import { transformTaskToTitle } from '../utils/transformers'
import { EventDialogContent } from './EventDialogContent'

export interface TaskProps extends EventProps {
  time: string
  timestamp: number
  locale?: string
  classes?: Record<string, any>
}

const StyledBox = styled(Box)({
  display: 'flex',
  '& p': {
    whiteSpace: 'nowrap',
    overflow: 'hidden',
  },
  boxSizing: 'border-box',
  alignItems: 'center',
  gap: '5px',
  width: '100%',
  cursor: 'pointer',
  padding: '0 5px',
  '&:hover': {
    backgroundColor: '#64B5F6',        
  },
  borderRadius: '10px',
})

const StyledMicIcon = styled(HeadsetMic)({
  fontSize: '10px',
  color: 'blue',
})

export function Task(props: TaskProps) {
  const {
    classes,
  } = props

  const [ anchorEl, setAnchorEl ] = useState<Element | null>(null)

  const onClick = (e: SyntheticEvent) => {
    setAnchorEl(e.currentTarget)
  }
  const onClose = () => {
    setAnchorEl(null)
  }
  const open = Boolean(anchorEl)

  return <StyledBox className={ classes?.TaskRoot } onClick={ onClick }>
    <StyledMicIcon />
    <Typography>
      { transformTaskToTitle(props) }
    </Typography>
    <Popover
            open={ open }
            anchorEl={ anchorEl }
            onClose={ onClose }
            anchorOrigin={ {
              vertical: 'top',
              horizontal: 'left',
            } }
            transformOrigin={ {
              vertical: 'top',
              horizontal: 'center',
            } }
    >
      <EventDialogContent { ...props } />
    </Popover>
  </StyledBox>
    
}
