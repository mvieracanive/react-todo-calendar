/**
 * Copyright (c) 2012-present Sedicii Innovations Ltd.
 *
 * All rights reserved.
 */
import moment from 'moment'
import React from 'react'
import { MonthDay } from './components/MonthDay'
import { Task, TaskProps } from './components/Task'
import { MonthView, WEEK_START_DAY } from './components/View'
import { WeekDayHeader } from './components/WeekDayHeader'
import { WeekRow } from './components/WeekRow'
import { transformEventListToMonthDayMap } from './utils/transformers'

export interface ViewProps {
  type?: 'month'
  month: number
  year: number
}

export interface EventProps {
  title?: string
  startDate: Date
  endDate?: Date
  resourceType?: 'INTERVIEW'
  firstName?: string
  lastName?: string
  phoneNumber?: string
  email?: string
  address?: string
  dateOfBirth?: string
}

export interface EventCalendarProps {
  eventList: EventProps[]
  view: ViewProps
  classes?: any
  locale?: string
}

export function EventCalendar(props: EventCalendarProps) {
  const {
    view,
    classes,
    eventList,
    locale = 'en',
  } = props

  const monthDayMap = transformEventListToMonthDayMap(eventList)
  debugger
  return <MonthView { ...view } classes={ classes } >
    <WeekRow cssClass={ classes?.WeekDayHeaderRow } >
      { [ 0, 1, 2, 3, 4, 5, 6 ].map(it => 
        <WeekDayHeader key = { it } locale = { locale } day = { it } classes={ classes } />,
      )}
    </WeekRow>

    { renderWeeks(view, classes, monthDayMap, locale) }

  </MonthView>
}

function renderWeeks(
  { month, year }: ViewProps,
  classes: Record<string, any> | undefined,
  tasks: Map<number, Map<number, TaskProps[]>>,
  locale: string,
) {
  const firstDayMonth = moment([ year, month, 1 ])
  const firstWeekDay = +firstDayMonth.startOf('days').format('E')
  const lastMonthDay = firstDayMonth.endOf('months').date()

  const weeks = []
  let flag = false
  let offset = -firstWeekDay + 1
  let dayCounting = WEEK_START_DAY
  do {
    const week = []
    for (let i = dayCounting + offset; i < dayCounting + offset + 7; i++) {
      if (i === lastMonthDay && !offset) {
        flag = true
      }

      const iDate = moment(new Date(year, month, i))
      const renderingDay = iDate.date()
      const renderingMonth = iDate.month()
            
      let events: React.ReactElement[] = []
      if (isInsideMonth(iDate, year, month)) {
        events = tasks.get(renderingMonth)?.get(renderingDay)?.map(
              it => <Task
                      { ...it }
                      classes={ classes }
                      locale = { locale } />
              ) ?? []
      }

      const showMonth = isInsideMonth(iDate, year, month) && renderingDay === 1 && iDate.format('MMM')
      week.push(
        <MonthDay
          day = { renderingDay }
          inactiveDay = { !isInsideMonth(iDate, year, month) }
          month={ showMonth || undefined }
          isToday = { isToday(iDate) } >
            { events }
        </MonthDay>,
      )
    }

    dayCounting += offset + 7
    offset = 0

    weeks.push(<WeekRow key = { `row-${ dayCounting }` } height='20%' cssClass={ classes?.MonthWeekDayRow } >
      { week }
    </WeekRow>)

  } while (!flag)

  return weeks
}

function isInsideMonth(date: any, year: number, month: number) {
  return date.isBetween(
    moment([year, month, 1]).startOf('days'),
    moment([year, month, 1]).endOf('month'), 'day', '[]'
  )
}

function isToday(date: any) {
  return date.isSame(moment(), 'day')
}
