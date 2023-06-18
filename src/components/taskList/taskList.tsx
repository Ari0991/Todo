import React from 'react'

import Task from '../task/task'
import './taskList.css'

type ITasks = {
  text: string
  id: string
  min: string | number
  sec: string | number
  done: boolean
  edit: boolean
  date: Date
  pause: boolean
}

const TaskList: any = ({ todos, onDeleted, onToggleDone, onEdited, onFixTask, pause, tick }: any) => {
  const elements = todos.map((elem: ITasks) => {
    const { text, id, done, edit, date, min, sec } = elem
    console.log(id)
    return (
      <Task
        key={id}
        text={text}
        id={id}
        done={done}
        edit={edit}
        date={date}
        min={min}
        sec={sec}
        tick={tick}
        onDeleted={() => onDeleted(id)}
        onEdited={() => onEdited(id)}
        onToggleDone={() => onToggleDone(id)}
        onFixTask={onFixTask}
        pause={pause}
      />
    )
  })

  return (
    <section className="main">
      <ul className="todo-list">{elements}</ul>
    </section>
  )
}

export default TaskList
