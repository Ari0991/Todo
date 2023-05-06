import React, { Component } from 'react'
import PropTypes from 'prop-types'

import Task from '../task/task.js'
import './taskList.css'

export default class TaskList extends Component {
  render() {
    const { todos, onDeleted, onToggleDone, onEdited, onFixTask, getTime, filter, tick } = this.props
    const elements = todos.map((elem) => {
      const { text, id, done, edit, date, min, sec } = elem

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
          getTime={getTime}
          tick={tick}
          onDeleted={() => onDeleted(id)}
          onEdited={() => onEdited(id)}
          onToggleDone={() => onToggleDone(id)}
          onFixTask={onFixTask}
          filter={filter}
        />
      )
    })

    return (
      <section className="main">
        <ul className="todo-list">{elements}</ul>
      </section>
    )
  }

  static propTypes = {
    todos: PropTypes.arrayOf(PropTypes.object),
    onDeleted: PropTypes.func.isRequired,
    onEdited: PropTypes.func.isRequired,
    onToggleDone: PropTypes.func.isRequired,
    onFixTask: PropTypes.func.isRequired,
  }
}
