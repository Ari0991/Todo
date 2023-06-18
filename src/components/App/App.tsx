import React, { useState } from 'react'

import NewTaskForm from '../newTaskForm/newTaskForm'
import Footer from '../footer/footer'
import TaskList from '../taskList/taskList'

import './App.css'

type ITasks = {
  text: string
  id: string
  min: string | number
  sec: string | number
  done: boolean
  edit: boolean
  date: Date
  pause: boolean
  findIndex?: () => boolean
  splice?: () => []
}

export const App = () => {
  const [tasks, setTasks] = useState<ITasks[] | []>([])
  const [filter, setFilter] = useState('all')

  const deleteItem = (id: string) => {
    setTasks((tasks) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      let newTasks = structuredClone(tasks)
      newTasks.splice(index, 1)
      return newTasks
    })
  }

  const editItem: any = (id: string) => {
    setTasks((tasks) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, edit: !oldItem.edit }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]
      return newTasks
    })
  }

  const checkFormat = (num: number): string | number => {
    if (num.toString().length === 1) {
      return `0${num}`
    }
    return num
  }

  const createItem = (text: string, min: number, sec: number): ITasks => {
    console.log(text, min, sec)

    const id = `${text}${min}${sec}_id`

    return {
      text: text,
      id: id,
      min: checkFormat(min),
      sec: checkFormat(sec),
      done: false,
      edit: false,
      date: new Date(),
      pause: true,
    }
  }
  const addItem = (value: string, min: number, sec: number): void => {
    const newItem = createItem(value, min, sec)

    setTasks((tasks) => {
      const newTasks: ITasks[] = [newItem, ...tasks]
      return newTasks
    })
  }

  const onToggleDone = (id: string): void => {
    setTasks((tasks) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]
      return newTasks
    })
  }

  const countTasks = (arr: ITasks[]): { allCount: number; doneCount: number } => {
    return {
      allCount: arr.length,
      doneCount: arr.filter((elem) => elem.done === true).length,
    }
  }

  const onFilterChange = (name: string): void => {
    setFilter(name)
  }

  const filterItems = (items: ITasks[], filter: string): ITasks[] | undefined => {
    if (filter === 'all') {
      return items
    } else if (filter === 'completed') {
      return items.filter((item) => item.done)
    } else if (filter === 'active') {
      return items.filter((item) => !item.done)
    }
  }

  const clearCompleted = () => {
    setTasks((tasks) => {
      const newTasks = structuredClone(tasks).filter((elem) => !elem.done)
      return newTasks
    })
  }

  const fixTask = (id: string, text: string) => {
    setTasks((tasks) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, text: text, edit: false }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]

      return newTasks
    })
  }

  const tick = (id: string, min: number, sec: number): void => {
    setTasks((tasks) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const before = tasks.slice(0, index)
      const after = tasks.slice(index + 1)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, min: min, sec: sec }
      const newTasks = [...before, newItem, ...after]
      return newTasks
    })
  }

  const allCount = countTasks(tasks).allCount
  const doneCount = countTasks(tasks).doneCount
  const filteredTasks = filterItems(tasks, filter)

  return (
    <section className="todoapp">
      <NewTaskForm addItem={addItem} />
      <TaskList
        todos={filteredTasks}
        onDeleted={deleteItem}
        onEdited={editItem}
        onToggleDone={onToggleDone}
        onFixTask={fixTask}
        filter={filter}
        tick={tick}
      />
      <Footer
        allCount={allCount}
        doneCount={doneCount}
        filter={filter}
        onFilterChange={onFilterChange}
        onClearCompleted={clearCompleted}
      />
    </section>
  )
}
