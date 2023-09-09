import React from 'react'
import { EventTask } from "./MonthDay";

export interface TaskProps extends EventTask {

}

export function Task(props: TaskProps) {
    return <span>
        { props.title }
    </span>
}