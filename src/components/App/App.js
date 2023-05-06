import React, { Component } from 'react'

import './App.css'
import NewTaskForm from '../newTaskForm/newTaskForm.js'
import Footer from '../footer/footer.js'
import TaskList from '../taskList/taskList.js'

export default class App extends Component {
  state = {
    tasks: [],
    filter: 'all',
  }

  static propTypes = {}

  deleteItem = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      let newTasks = structuredClone(this.state.tasks)
      newTasks.splice(index, 1)
      return {
        tasks: newTasks,
      }
    })
  }

  editItem = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, edit: !oldItem.edit }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]
      return { tasks: newTasks }
    })
  }

  checkFormat = (num) => {
    if (num.length === 1) {
      return `0${num}`
    }
    return num
  }

  createItem(text, min, sec) {
    const cutText = text.slice(0, 4)
    const id = `${cutText}${min}${sec}_id`

    return {
      text: text,
      id: id,
      min: this.checkFormat(min),
      sec: this.checkFormat(sec),
      done: false,
      edit: false,
      date: new Date(),
      pause: true,
    }
  }
  addItem = (value, min, sec) => {
    const newItem = this.createItem(value, min, sec)
    this.setState(({ tasks }) => {
      const newTasks = [newItem, ...tasks]
      return {
        tasks: newTasks,
      }
    })
  }

  onToggleDone = (id) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, done: !oldItem.done }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]
      return { tasks: newTasks }
    })
  }

  countTasks(arr) {
    return {
      allCount: arr.length,
      doneCount: arr.filter((elem) => elem.done === true).length,
    }
  }

  onFilterChange = (name) => {
    this.setState({
      filter: name,
    })
  }

  filterItems = (items, filter) => {
    if (filter === 'all') {
      return items
    } else if (filter === 'completed') {
      return items.filter((item) => item.done)
    } else if (filter === 'active') {
      return items.filter((item) => !item.done)
    }
  }

  clearCompleted = () => {
    this.setState(({ tasks }) => {
      const newTasks = structuredClone(tasks).filter((elem) => !elem.done)
      return { tasks: newTasks }
    })
  }

  fixTask = (id, text) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, text: text, edit: false }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]

      return { tasks: newTasks }
    })
  }

  tick = (id, min, sec) => {
    this.setState(({ tasks }) => {
      const index = tasks.findIndex((elem) => elem.id === id)
      const before = tasks.slice(0, index)
      const after = tasks.slice(index + 1)
      const oldItem = tasks[index]
      const newItem = { ...oldItem, min: min, sec: sec }
      const newTasks = [...before, newItem, ...after]
      return { tasks: newTasks }
    })
  }

  render() {
    const { tasks, filter } = this.state

    const allCount = this.countTasks(tasks).allCount
    const doneCount = this.countTasks(tasks).doneCount

    const filteredTasks = this.filterItems(tasks, filter)

    return (
      <section className="todoapp">
        <NewTaskForm addItem={this.addItem} />
        <TaskList
          todos={filteredTasks}
          onDeleted={this.deleteItem}
          onEdited={this.editItem}
          onToggleDone={this.onToggleDone}
          onFixTask={this.fixTask}
          getTime={this.getTime}
          filter={filter}
          tick={this.tick}
        />
        <Footer
          allCount={allCount}
          doneCount={doneCount}
          filter={filter}
          onFilterChange={this.onFilterChange}
          onClearCompleted={this.clearCompleted}
        />
      </section>
    )
  }
}
