import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { formatDistanceToNow } from 'date-fns'
import './task.css'

import Timer from '../timer/timer.js'

const Task = ({ text, id, done, edit, date, onDeleted, onToggleDone, onEdited, onFixTask, min, sec, tick }) => {
  const [value, setValue] = useState(text)

  const classChange = (done, edit) => {
    let classNames = ''
    if (done) {
      classNames = 'completed'
    } else if (edit) {
      classNames = 'editing'
    }
    return classNames
  }
  const valueChange = (evt) => {
    setValue(evt.target.value)
  }

  const submitFixTask = (evt) => {
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
          <input id={id} type="checkbox" className="toggle" />
          <label htmlFor={id} onClick={onToggleDone}>
            <span className="title">{text}</span>
            <Timer min={min} sec={sec} id={id} tick={tick} done={done}></Timer>

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

Task.propTypes = {
  text: PropTypes.string,
  id: PropTypes.string,
  done: PropTypes.bool,
  edit: PropTypes.bool,
  date: PropTypes.any,
}

Task.defaultProps = {
  text: '',
  id: 'new_id',
  done: false,
  edit: false,
  date: new Date(),
}

export default Task
