/**
 * @description Timer
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useKeyboardControls} from '@react-three/drei'
import {useEffect, useState} from 'react'
import {addEffect} from '@react-three/fiber'
import {TimerManager} from '../../../service/timer-manager.ts'
import {useStageStore} from '../../../store/stage.ts'

export const Timer = () => {
  const isStarted = useStageStore((state) => state.isStarted)
  const isFinished = useStageStore((state) => state.isFinished)
  const start = useStageStore((state) => state.start)
  const startTime = useStageStore((state) => state.startTime)
  const finishTime = useStageStore((state) => state.finishTime)
  const [sub] = useKeyboardControls()

  const [time, setTime] = useState(0)

  useEffect(() => {
    if (isStarted) {
      return
    }

    const unsub = sub(() => {
      start()
    })

    return () => {
      unsub()
    }
  }, [isStarted])

  useEffect(() => {
    if (!isStarted) {
      return
    }

    const removeEffect = addEffect(() => {
      const t = TimerManager.processGameElapsedTime(
        startTime as number,
        finishTime as number,
        Date.now(),
        isFinished,
      )
      setTime(t)
    })

    return () => {
      removeEffect()
    }
  }, [isStarted])

  return (
    <div className="fixed top-2 right-2 text-primary">{time.toFixed(2)}</div>
  )
}
