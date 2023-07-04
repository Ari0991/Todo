import React, { useState, useEffect } from 'react'

type Iprops = {
  min: number
  sec: number
  id: string
  tick: (id: string, min: number, sec: number) => void
  done: boolean
}

const Timer = ({ min, sec, id, tick, done }: Iprops) => {
  const [minutes, setMinutes] = useState(min)
  const [seconds, setSeconds] = useState(sec)
  const [pause, setPause] = useState(false)

  let secTimer: any = seconds
  useEffect(() => {
    console.log('clear timeout')
    return () => clearTimeout(secTimer)
  })
  if (minutes < 0) {
    const newMin = 0
    setMinutes(newMin)
  }

  if (seconds < 0) {
    const newSec = 0
    setSeconds(newSec)
  }

  const minLeft = (minutes: number) => {
    if (minutes > 0) {
      setMinutes((minutes) => {
        const newMin = structuredClone(minutes)
        return Number(newMin) - 1
      })
    } else {
      setMinutes(0)
      setSeconds(0)
      clearTimeout(secTimer)
    }
  }

  const timeLeft = (min: number, sec: number, id: string) => {
    const OldNow = new Date().getTime()

    secTimer = setTimeout(() => {
      tick(id, min, sec)
      const start = structuredClone(sec)
      const newNow = new Date().getTime()
      const difference = (newNow - OldNow) / 1000
      sec.toString().length > 1 ? setSeconds(start - difference) : setSeconds(start - difference)

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
