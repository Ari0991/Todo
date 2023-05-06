import React, { Component } from 'react'

export default class Timer extends Component {
  state = {
    min: this.props.min,
    sec: this.props.sec,
    pause: false,
    getTime: false,
  }

  componentDidUpdate() {
    if (this.state.min < 0) {
      const newMin = '00'
      this.setState({ min: newMin })
    }
  }

  minLeft = (min) => {
    if (Number(min) > 0) {
      this.setState(({ min }) => {
        const newMin = structuredClone(min)
        return { min: Number(newMin) - 1 }
      })
    } else {
      this.setState({ min: '00', sec: '00' })
      clearTimeout(this.secTimer)
    }
  }

  timeLeft = (min, sec, id) => {
    const OldNow = new Date().getTime()

    this.secTimer = setTimeout(() => {
      this.props.tick(id, min, sec)
      const start = Number(structuredClone(sec))

      const newNow = new Date().getTime()
      const difference = (newNow - OldNow) / 1000
      sec.length > 1 ? this.setState({ sec: start - difference }) : this.setState({ sec: `0${start - difference}` })

      if (Math.floor(sec) === 0 || Number(sec) < 0) {
        this.setState({ sec: 59 })
        this.minLeft(min)
      }
    }, 1000)
  }

  setPause = () => {
    this.setState({ pause: true })
  }

  setPlay = () => {
    this.setState({ pause: false })
  }

  componentWillUnmount() {
    clearTimeout(this.secTimer)
  }

  changeTime(id, min, sec) {
    this.props.getTime(id, min, sec)
  }

  render() {
    const { min, sec, pause } = this.state
    const { check, id } = this.props
    if (pause || check === 'completed') {
      clearTimeout(this.secTimer)
    } else if (!pause) {
      this.timeLeft(min, sec, id)
    }

    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.setPlay}></button>
        <button className="icon icon-pause" onClick={this.setPause}></button>
        <span>{Number(sec) >= 10 ? `${min}:${Math.trunc(sec)}` : `${min}:0${Math.trunc(sec)}`}</span>
      </span>
    )
  }
}
