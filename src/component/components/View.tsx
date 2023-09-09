import React, { PropsWithChildren } from 'react'
import { ViewProps } from '../TodoCalendar';
import { Box, styled } from '@material-ui/core';

export const WEEK_CELL_WIDTH = '14%'
export const WEEK_START_DAY = 1

const StyledBox = styled(Box)({
    border: '1px solid black',
    display: 'flex',
    flexDirection: 'column',
    width: '100%'
})

export function MonthView(props: PropsWithChildren< { classes: any | undefined }>) {
    const {
        classes,
        children
    } = props

    return <StyledBox
        height={ '100%' }
        className={ classes?.MonthView }
        classes={ classes } >
            { children }
    </StyledBox>
}
