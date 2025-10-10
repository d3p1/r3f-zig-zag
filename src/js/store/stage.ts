/**
 * @description Stage store
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import {create} from 'zustand/react'
import type {StageState} from '../types'

export const useStageStore = create<StageState>((set) => ({
  geometry: new THREE.BoxGeometry(),
  floorMaterial: new THREE.MeshStandardMaterial({color: 'limegreen'}),
  floorTrapMaterial: new THREE.MeshStandardMaterial({color: 'lime'}),
  trapMaterial: new THREE.MeshStandardMaterial({color: 'red'}),
  wallMaterial: new THREE.MeshStandardMaterial({color: 'slategray'}),
  trapCount: 3,
  isStarted: false,
  isFinished: false,
  timeStart: null,
  timeFinish: null,

  start: () => {
    set({
      isStarted: true,
      timeStart: Date.now(),
    })
  },

  finish: () => {
    set({
      isFinished: true,
      timeFinish: Date.now(),
    })
  },
}))
