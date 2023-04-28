import React, { Component } from 'react'

export default class Timer extends Component {
  state = {
    min: this.props.min,
    sec: this.props.sec,
    pause: true,
  }

  minLeft = (min) => {
    if (Number(min) > 0) {
      this.setState(({ min }) => {
        const newMin = structuredClone(min)
        return { min: Number(newMin) - 1 }
      })
    } else {
      this.setState({ sec: '00' })
      clearTimeout(this.secTimer)
    }
  }

  secLeft = (min, sec) => {
    const OldNow = new Date().getTime()

    this.secTimer = setTimeout(() => {
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

  render() {
    const { min, sec, pause } = this.state

    const { check } = this.props
    if (pause || check === 'completed') {
      clearTimeout(this.secTimer)
    } else if (!pause) {
      this.secLeft(min, sec)
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
