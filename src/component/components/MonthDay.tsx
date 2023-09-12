/**
 * Copyright (c) 2012-present Sedicii Innovations Ltd.
 *
 * All rights reserved.
 */
import { Box, Typography, styled } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'
import { WEEK_CELL_WIDTH } from './View'

export interface MonthDayProps {
  day: number
  month?: string
  inactiveDay?: boolean
  classes?: any
  isToday?: boolean
}

export function MonthDay(props: PropsWithChildren<MonthDayProps>) {
  const {
    day,
    classes,
    month,
    inactiveDay,
  } = props

  const StyledBox = styled(Box)({
    width: WEEK_CELL_WIDTH,
    height: '100%',
    boxSizing: 'border-box',
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
    border: '1px solid gray',
    borderColor: 'rgba(10, 10, 10, 0.10)',
    backgroundColor: inactiveDay ? 'rgba(200, 200, 200, 0.10)' : 'transparent',
    overflow: 'auto',
  })

  const dayText = `${ day }${ month ? ` ${ month }` : '' }`

  return <StyledBox className={ inactiveDay ? classes?.InactiveDayMonth : classes?.DayMonth }>
    <Typography align='center'> { dayText } </Typography>
    { props.children }
  </StyledBox>
}