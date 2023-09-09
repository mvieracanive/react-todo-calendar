import React from 'react'
import { MonthView, WEEK_START_DAY } from './components/View'
import { WeekDayHeader } from './components/WeekDayHeader'
import { WeekRow } from './components/WeekRow'
import moment from 'moment'
import { MonthDay, EventTask } from './components/MonthDay'
import { render } from 'react-dom'
import { transformEventListToMonthDayMap } from './utils/transformers'
import { Task } from './components/Task'

export interface ViewProps {
    type: 'month'
    month: number
    year: number
}

export interface EventPorps {
    title: string
    startDate: Date
    endDate?: Date
    resourceType?: 'INTERVIEW'
}

export interface TodoCalendarProps {
    eventList: EventPorps[]
    view: ViewProps
    classes?: any
}

export function TodoCalendar(props: TodoCalendarProps) {
    const {
        view,
        classes,
        eventList
    } = props

    const monthDayMap = transformEventListToMonthDayMap(eventList, view.month)

    return <MonthView { ...view } classes={ classes } >
        <WeekRow cssClass={ classes.WeekDayHeaderRow } >
            { [ 0, 1, 2, 3, 4, 5, 6 ].map( it => <WeekDayHeader day = { it } classes={ classes } />) }
        </WeekRow>

        
        { renderFirstWeek(view, classes, monthDayMap) }

        { renderReminingWeeks(view, classes, monthDayMap) }

    </MonthView>
}

function renderFirstWeek({ month, year }: ViewProps, classes: any, tasks: Map<number, EventTask[]>) {
    const firstWeekDay = +moment([ year, month, 1 ]).startOf('days').format('E')

    const pastDays = []
    for (let i = 1; i < firstWeekDay; i++) {
        const pastDay = moment([ year, month, 1 ]).startOf('days').subtract(firstWeekDay - i, 'days').date()
        pastDays.push(
            <MonthDay day = { pastDay } inactiveDay />
        )
    }

    const nextDays = []
    for (let i = firstWeekDay; i < 8; i++) {
        const day = moment([ year, month, 1 ]).startOf('days').add(i - firstWeekDay, 'days').date()
        nextDays.push(
            <MonthDay day = { day } >
                { tasks.get(day)?.map(it => <Task { ...it }/>) }
            </MonthDay>
        )
    }

    return <WeekRow height='20%' cssClass={ classes.MonthWeekDayRow } >
        { [ ...pastDays, ...nextDays ] }
    </WeekRow>
}

function renderReminingWeeks({ month, year }: ViewProps, classes: any, tasks: Map<number, EventTask[]>) {
    const daysToSecondWeek = 8 - +moment([ year, month, 1 ]).startOf('days').format('E')

    const dayOfMonthSecondWeek = moment([ year, month, 1 ]).startOf('days').add(daysToSecondWeek, 'days').date()
    
    const middleWeeks = []
    let flag = false
    let dayCounting = dayOfMonthSecondWeek
    do{
        const week = []
        for (let i = dayCounting; i < dayCounting + 7; i++) {
            const day = new Date(year, month, i).getDate()
            const dayOfWeek = +moment([ year, month, day ]).startOf('days').format('E')

            if (day < dayOfMonthSecondWeek && dayOfWeek === WEEK_START_DAY) {
                flag = true
                break
            }
            
            let events: React.JSX.Element[] = []
            if (day >= dayOfMonthSecondWeek) {
                events = tasks.get(day)?.map(it => <Task { ...it }/>) ?? []
            }

            week.push(
                <MonthDay day = { day } inactiveDay = { i < dayOfMonthSecondWeek }>
                    { events }
                </MonthDay>
            )
        }

        dayCounting += 7

        middleWeeks.push(<WeekRow height='20%' cssClass={ classes.MonthWeekDayRow } >
                { week }
            </WeekRow>)

    } while(middleWeeks.length < 5 || flag)

    return middleWeeks
}
