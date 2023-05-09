import React, { useState, useEffect } from 'react'

const Timer = ({ min, sec, id, tick, done } = this.state) => {
  const [minutes, setMinutes] = useState(min)
  const [seconds, setSeconds] = useState(sec)
  const [pause, setPause] = useState(false)

  let secTimer = seconds

  if (minutes < 0) {
    const newMin = '00'
    setMinutes(newMin)
  }

  if (seconds < 0) {
    const newSec = '00'
    setSeconds(newSec)
  }

  const minLeft = (minutes) => {
    if (Number(minutes) > 0) {
      setMinutes((minutes) => {
        const newMin = structuredClone(minutes)
        return Number(newMin) - 1
      })
    } else {
      setMinutes('00')
      setSeconds('00')
      clearTimeout(secTimer)
    }
  }

  const timeLeft = (min, sec, id) => {
    const OldNow = new Date().getTime()

    secTimer = setTimeout(() => {
      tick(id, min, sec)
      const start = Number(structuredClone(sec))
      const newNow = new Date().getTime()
      const difference = (newNow - OldNow) / 1000
      sec.length > 1 ? setSeconds(start - difference) : setSeconds(`0${start - difference}`)

      if (Math.floor(sec) === 0 || Number(sec) < 0) {
        setSeconds(59)
        minLeft(min)
      }
      return clearTimeout(secTimer)
    }, 1000)
  }

  const clickPause = () => {
    setPause(true)
  }

  const clickPlay = () => {
    setPause(false)
  }

  if (pause || done) {
    clearTimeout(secTimer)
  } else if (!pause) {
    timeLeft(minutes, seconds, id)
  }

  return (
    <span className="description">
      <button className="icon icon-play" onClick={clickPlay}></button>
      <button className="icon icon-pause" onClick={clickPause}></button>
      <span>{Number(seconds) >= 10 ? `${minutes}:${Math.floor(seconds)}` : `${minutes}:0${Math.floor(seconds)}`}</span>
    </span>
  )
}
export default Timer
