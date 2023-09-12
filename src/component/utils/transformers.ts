/**
 * Copyright (c) 2012-present Sedicii Innovations Ltd.
 *
 * All rights reserved.
 */
import moment from 'moment'
import { EventProps } from '../EventCalendar'
import { TaskProps } from '../components/Task'

export function transformEventListToMonthDayMap(
  eventList: EventProps[],
): Map<number, Map<number, TaskProps[]>> {  
  const monthMap = new Map()

  eventList.forEach(event => {
    const day = moment(event.startDate).date()
    const eventMonth = moment(event.startDate).month()
    
   
    let monthDayMap = monthMap.get(eventMonth)
    if (!monthDayMap) {
      monthDayMap = new Map()
      monthMap.set(eventMonth, monthDayMap)
    }
    
    const tasks: TaskProps[] = monthDayMap.get(day) ?? []
    const task = {
      ...event,
      time: moment(event.startDate).format('h:mm a'),
      timestamp: moment(event.startDate).toDate().getTime(),
    }

    const indexToInsert = tasks.findIndex((it: TaskProps) => it.timestamp > task.timestamp)
    tasks.splice(indexToInsert, 0, task)

    monthDayMap.set(day, tasks)
  })
    
  return monthMap
}

export function getFullDate(task: TaskProps) {
  const {
    startDate,
    endDate,
    locale,
  } = task

  const strDate = moment(startDate).locale(locale ?? 'en').format('LLLL')

  let time = moment(startDate).format('LT')
  const endTime = endDate && moment(endDate).format('LT')
  if (endTime) {
    time += ` — ${ endTime }`
  }

  return `${ strDate } (${ time })`
}

export function getFullName(task: TaskProps) {
  const {
    firstName,
    lastName,
  } = task

  let newTitle = ''

  if (firstName) {
    if (newTitle.length) {
      newTitle += ' '
    }

    newTitle += firstName
  }

  if (lastName) {
    if (newTitle.length) {
      newTitle += ' '
    }

    newTitle += lastName
  }

  return newTitle
}

export function transformTaskToTitle(task: TaskProps) {
  const {
    time,
    title,
  } = task

  if (title) {
    return `${ time ?? '' } ${ title }`
  }

  let newTitle = ''

  if (time) {
    newTitle += time
  }

  if (getFullName(task)) {
    if (newTitle.length) {
      newTitle += ' '
    }

    newTitle += getFullName(task)
  }

  return newTitle
}
