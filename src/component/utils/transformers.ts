import moment from "moment";
import { EventPorps } from "../TodoCalendar";
import { EventTask } from "../components/MonthDay";

export function transformEventListToMonthDayMap(
    eventList: EventPorps[],
    month: number
): Map<number, EventTask[]> {
    const monthDayMap = new Map()

    eventList.forEach(event => {
        const day = moment(event.startDate).date()
        const eventMonth = moment(event.startDate).month()
        
        if (+eventMonth !== month) {
            return
        }

        const tasks: EventTask[] = monthDayMap.get(day) ?? []
        const task = {
            title: event.title,
            time: moment(event.startDate).format('h:mm a'),
            timestamp: moment(event.startDate).toDate().getTime()
        }

        const indexToInsert = tasks.findIndex((it: EventTask) => it.timestamp > task.timestamp )
        tasks.splice(indexToInsert, 0, task)

        monthDayMap.set(day, tasks)
    });
    
    return monthDayMap
}
