import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

import './newTaskForm.css'

const NewTaskForm = ({ addItem }) => {
  const [value, setValue] = useState('')
  const [minutes, setMinutes] = useState('')
  const [seconds, setSeconds] = useState('')
  const [correctTime, setCorrectTime] = useState(true)

  const changeState = (evt) => {
    setValue(evt.target.value)
  }

  const changeMin = (evt) => {
    setMinutes(trimValue(evt.target.value))
  }

  const changeSec = (evt) => {
    setSeconds(trimValue(evt.target.value))
  }

  const timeCheck = (minutes, seconds) => {
    const min = Number(minutes)
    const sec = Number(seconds)

    if (min > 60 || sec > 60) {
      return false
    } else if (min === 60 && sec > 0) {
      return false
    }
    return true
  }

  const trimValue = (value) => {
    return value.trim()
  }

  const submitValue = (evt) => {
    evt.preventDefault()
    const verify = timeCheck(minutes, seconds)

    if (!verify) {
      return setCorrectTime(false)
    } else if (verify && trimValue(value) !== '') {
      addItem(value, minutes, seconds)
      setValue('')
      setSeconds('')
      setMinutes('')
      setCorrectTime(true)
    }
  }

  const isCorrectTime = correctTime ? null : (
    <Alert
      closable
      message="Неверный формат данных"
      description="Пожалуйста, введите мин. и сек. в диапазоне от 0 до 60, общее время не более 60 мин."
      type="warning"
    />
  )

  return (
    <header className="header">
      <h1>Todos</h1>
      {isCorrectTime}
      <form className="new-todo-form" onSubmit={submitValue}>
        <input
          type="text"
          className="new-todo edit"
          placeholder="What needs to be done?"
          autoFocus
          value={value}
          onChange={changeState}
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Min"
          autoFocus
          maxLength="2"
          onChange={changeMin}
          value={minutes}
          pattern="[0-9]{1,2}"
          required
        />
        <input
          className="new-todo-form__timer"
          placeholder="Sec"
          autoFocus
          maxLength="2"
          onChange={changeSec}
          value={seconds}
          pattern="[0-9]{1,2}"
          required
        />
        <button type="submit"></button>
      </form>
    </header>
  )
}

NewTaskForm.propTypes = {
  addItem: PropTypes.func.isRequired,
}

export default NewTaskForm
