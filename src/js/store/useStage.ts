/**
 * @description Stage store
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import {create} from 'zustand/react'
import type {Stage} from '../types'

export const useStage = create<Stage>()((_, get) => ({
  geometry: new THREE.BoxGeometry(),
  floorMaterial: new THREE.MeshStandardMaterial({color: 'limegreen'}),
  floorTrapMaterial: new THREE.MeshStandardMaterial({color: 'lime'}),
  trapMaterial: new THREE.MeshStandardMaterial({color: 'red'}),
  wallMaterial: new THREE.MeshStandardMaterial({color: 'slategray'}),
  trapCount: 3,

  /**
   * Get total steps.
   * It is the number of traps plus the start and end steps
   *
   * @returns {number}
   */
  getTotalSteps: (): number => {
    const {trapCount} = get()
    return trapCount + 2
  },
}))
