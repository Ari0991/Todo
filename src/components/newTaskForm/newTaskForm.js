import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Alert } from 'antd'

import './newTaskForm.css'

export default class NewTaskForm extends Component {
  state = {
    value: '',
    minutes: '',
    seconds: '',
    correctTime: true,
  }

  changeState = (evt) => {
    this.setState({ value: evt.target.value })
  }

  changeMin = (evt) => {
    this.setState({ minutes: this.trimValue(evt.target.value) })
  }

  changeSec = (evt) => {
    this.setState({ seconds: this.trimValue(evt.target.value) })
  }

  timeCheck = (minutes, seconds) => {
    const min = Number(minutes)
    const sec = Number(seconds)

    if (min > 60 || sec > 60) {
      return false
    } else if (min === 60 && sec > 0) {
      return false
    }
    return true
  }

  trimValue = (value) => {
    return value.trim()
  }

  submitValue = (evt) => {
    evt.preventDefault()
    const { value, minutes, seconds } = this.state
    const { addItem } = this.props
    const verify = this.timeCheck(minutes, seconds)

    if (!verify) {
      return this.setState({ correctTime: false })
    } else if (verify && this.trimValue(value) !== '') {
      addItem(value, minutes, seconds)
      this.setState({ value: '', minutes: '', seconds: '', correctTime: true })
    }
  }

  render() {
    const { correctTime } = this.state
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
        <form className="new-todo-form" onSubmit={this.submitValue}>
          <input
            type="text"
            className="new-todo edit"
            placeholder="What needs to be done?"
            autoFocus
            value={this.state.value}
            onChange={this.changeState}
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Min"
            autoFocus
            maxLength="2"
            onChange={this.changeMin}
            value={this.state.minutes}
            pattern="[0-9]{1,2}"
            required
          />
          <input
            className="new-todo-form__timer"
            placeholder="Sec"
            autoFocus
            maxLength="2"
            onChange={this.changeSec}
            value={this.state.seconds}
            pattern="[0-9]{1,2}"
            required
          />
          <button type="submit"></button>
        </form>
      </header>
    )
  }

  static propTypes = {
    addItem: PropTypes.func.isRequired,
  }
}
