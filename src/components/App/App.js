import React, { useState } from 'react'
import PropTypes from 'prop-types'

import './App.css'
import NewTaskForm from '../newTaskForm/newTaskForm.js'
import Footer from '../footer/footer.js'
import TaskList from '../taskList/taskList.js'

const App = () => {
  const [tasks, setTasks] = useState([])
  const [filter, setFilter] = useState('all')

  const deleteItem = (id) => {
    setTasks((tasks) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      let newTasks = structuredClone(tasks)
      newTasks.splice(index, 1)
      return newTasks
    })
  }

  const editItem = (id) => {
    setTasks((tasks) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, edit: !oldItem.edit }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]
      return newTasks
    })
  }

  const checkFormat = (num) => {
    if (num.length === 1) {
      return `0${num}`
    }
    return num
  }

  const createItem = (text, min, sec) => {
    const cutText = text.slice(0, 4)
    const id = `${cutText}${min}${sec}_id`

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
  const addItem = (value, min, sec) => {
    const newItem = createItem(value, min, sec)

    setTasks((tasks) => {
      const newTasks = [newItem, ...tasks]
      return newTasks
    })
  }

  const onToggleDone = (id) => {
    setTasks((tasks) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]
      return newTasks
    })
  }

  const countTasks = (arr) => {
    return {
      allCount: arr.length,
      doneCount: arr.filter((elem) => elem.done === true).length,
    }
  }

  const onFilterChange = (name) => {
    setFilter(name)
  }

  const filterItems = (items, filter) => {
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

  const fixTask = (id, text) => {
    setTasks((tasks) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, text: text, edit: false }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]

      return newTasks
    })
  }

  const tick = (id, min, sec) => {
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

App.propTypes = {
  tasks: PropTypes.array,
  filter: PropTypes.string,
}

export default App
