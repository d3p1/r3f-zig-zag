/**
 * @description Debugger
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {useKeyboardControls} from '@react-three/drei'
import {Perf} from 'r3f-perf'
import {useEffect, useState} from 'react'
import * as React from 'react'
import type {ActiveControl} from '../../../types'

export const Debugger: React.FC = () => {
  const [isDebug, setIsDebug] = useState(false)
  const [sub] = useKeyboardControls<ActiveControl>()

  useEffect(() => {
    const unsub = sub(
      (state) => state.debug,
      (isPressed) => {
        if (!isPressed) {
          return
        }
        setIsDebug((value) => !value)
      },
    )

    return () => {
      unsub()
    }
  }, [])

  return <>{isDebug && <Perf position="top-left" />}</>
}
