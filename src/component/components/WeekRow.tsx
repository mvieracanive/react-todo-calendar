import { Box, styled } from '@material-ui/core'
import React, { PropsWithChildren } from 'react'

export interface WeekRowProps {
    height?: string
    cssClass?: any
}

export function WeekRow(props: PropsWithChildren<WeekRowProps>) {
    const {
        height = '30px',
        cssClass
    } = props

    const StyledBox = styled(Box)({
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        height,
        boxSizing: 'border-box',
    })

    return <StyledBox className={ cssClass }>
        { props.children }
    </StyledBox>
}