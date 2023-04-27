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
      clearTimeout(this.secTimer)
    }
  }

  secLeft = () => {
    const { min, sec } = this.state

    this.secTimer = setTimeout(() => {
      let secLeft = Number(sec) - 1
      if (secLeft >= 0) {
        secLeft >= 10 ? this.setState({ sec: secLeft }) : this.setState({ sec: `0${secLeft}` })
      } else {
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
      this.secLeft()
    }

    return (
      <span className="description">
        <button className="icon icon-play" onClick={this.setPlay}></button>
        <button className="icon icon-pause" onClick={this.setPause}></button>
        <span>{`${min}:${sec}`}</span>
      </span>
    )
  }
}
