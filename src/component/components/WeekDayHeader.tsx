import { Box, styled } from '@material-ui/core'
import moment from 'moment'
import React from 'react'
import { WEEK_CELL_WIDTH } from './View'

export interface WeekDayHeaderProps {
    day: number,
    locale?: string,
    classes?: any
}

const StyledBox = styled(Box)({
    width: WEEK_CELL_WIDTH,
    height: '100%',
    backgroundColor: 'gray',
    boxSizing: 'border-box',
    flexGrow: 1,
    alignItems: 'center',
    justifyContent: 'center',
    display: 'flex',
})

export function WeekDayHeader(props: WeekDayHeaderProps) {
    const {
        day,
        locale = 'en',
        classes,
    } = props

    return <StyledBox className={ classes?.WeekDayHeader }>
        <span> { moment('2023-09-04').startOf('days').add(day, 'days').locale(locale).format('ddd') } </span>
    </StyledBox>
}