import { Box, styled } from '@material-ui/core'
import moment from 'moment'
import React, { PropsWithChildren } from 'react'
import { WEEK_CELL_WIDTH } from './View'

export interface EventTask {
    title: string
    time: string
    timestamp: number
}

export interface MonthDayProps {
    day: number,
    inactiveDay?: boolean
    classes?: any
}

const StyledBox = styled(Box)({
    width: WEEK_CELL_WIDTH,
    height: '100%',
    boxSizing: 'border-box',
    flexGrow: 1,
    flexDirection: 'column',
    display: 'flex',
    border: '1px solid black'
})

export function MonthDay(props: PropsWithChildren<MonthDayProps>) {
    const {
        day,
        classes,
        inactiveDay = true
    } = props

    return <StyledBox className={ inactiveDay ? classes?.InactiveDayMonth : classes?.DayMonth }>
        <span> { day } </span>
        { props.children }
    </StyledBox>
}