import React, { useState } from 'react'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

import Timer from '../timer/timer'

type IProps = {
  text: string
  id: string
  min: string | number
  sec: string | number
  done: boolean
  edit: boolean
  date: Date
  pause: boolean

  onDeleted?: any
  onToggleDone?: any
  onEdited?: any
  onFixTask?: any
  tick?: any
}

const Task = ({ text, id, done, edit, date, min, sec, onDeleted, onToggleDone, onEdited, onFixTask, tick }: IProps) => {
  const [value, setValue] = useState<string>(text)

  const classChange = (done: boolean, edit: boolean): string => {
    let classNames = ''
    if (done) {
      classNames = 'completed'
    } else if (edit) {
      classNames = 'editing'
    }
    return classNames
  }
  const valueChange = (evt: any) => {
    setValue(evt.target.value)
  }

  const submitFixTask = (evt: any) => {
    evt.preventDefault()
    onFixTask(id, value)
  }

  const addDate = formatDistanceToNow(date, {
    includeSeconds: true,
    addSuffix: true,
  })

  return (
    <li className={classChange(done, edit)}>
      <div className="view">
        <div className="clicable" onClick={onToggleDone}>
          <input id={id.toString()} type="checkbox" className="toggle" />
          <label htmlFor={id.toString()} onClick={onToggleDone}>
            <span className="title">{text}</span>
            <Timer min={Number(min)} sec={Number(sec)} id={id} tick={tick} done={done}></Timer>

            <span className="description">created {addDate}</span>
          </label>
        </div>
        <button type="button" className="icon icon-edit" onClick={onEdited}></button>
        <button type="button" className="icon icon-destroy" onClick={onDeleted}></button>
      </div>
      <form onSubmit={submitFixTask}>
        <input type="text" className="edit" value={value} onChange={valueChange} required></input>
      </form>
    </li>
  )
}

Task.defaultProps = {
  text: '',
  id: 'new_id',
  done: false,
  edit: false,
  date: new Date(),
}

export default Task
