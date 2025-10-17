/**
 * @description Timer
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useKeyboardControls} from '@react-three/drei'
import {useEffect, useState} from 'react'
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

    let animationId: number | null = null
    const animate = () => {
      const t = TimerManager.processGameElapsedTime(
        startTime as number,
        finishTime as number,
        Date.now(),
        isFinished,
      )
      setTime(t)
      animationId = requestAnimationFrame(animate)
    }
    animate()

    return () => {
      if (!animationId) {
        return
      }

      cancelAnimationFrame(animationId)
    }
  }, [isStarted])

  return (
    <div className="fixed top-2 right-2 text-primary">{time.toFixed(2)}</div>
  )
}
