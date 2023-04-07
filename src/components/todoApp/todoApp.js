import React, { Component } from 'react'

import './todoApp.css'
import NewTaskForm from '../newTaskForm/newTaskForm.js'
import Footer from '../footer/footer.js'
import TaskList from '../taskList/taskList.js'

export default class App extends Component {
  maxId = 0
  state = {
    tasks: [],
    filter: 'all',
  }

  static propTypes = {}

  searchIndex(id) {
    let newTasks = structuredClone(this.state.tasks)
    const index = newTasks.findIndex((elem) => elem.id === id)
    return { newTasks, index }
  }

  deleteItem = (id) => {
    const { newTasks, index } = this.searchIndex(id)
    newTasks.splice(index, 1)
    this.setState(() => {
      return {
        tasks: newTasks,
      }
    })
  }

  editItem = (id) => {
    const { index } = this.searchIndex(id)
    this.setState(({ tasks }) => {
      const oldItem = tasks[index]
      const newItem = { ...oldItem, edit: !oldItem.edit }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]
      return { tasks: newTasks }
    })
  }

  createItem(text) {
    return {
      text: text,
      id: `${this.maxId++}_id`,
      done: false,
      edit: false,
      date: new Date(),
    }
  }
  addItem = (value) => {
    const newItem = this.createItem(value)
    this.setState(({ tasks }) => {
      const newTasks = [newItem, ...tasks]
      return {
        tasks: newTasks,
      }
    })
  }

  onToggleDone = (id) => {
    const { index } = this.searchIndex(id)
    this.setState(({ tasks }) => {
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
    const newTasks = structuredClone(this.state.tasks).filter((elem) => !elem.done)

    this.setState(() => {
      return { tasks: newTasks }
    })
  }

  fixTask = (id, text) => {
    const { index } = this.searchIndex(id)
    this.setState(({ tasks }) => {
      const oldItem = tasks[index]
      const newItem = { ...oldItem, text: text, edit: false }

      const newTasks = [...tasks.slice(0, index), newItem, ...tasks.slice(index + 1)]

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
