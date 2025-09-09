/**
 * @description Stage store
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import * as THREE from 'three'
import {create} from 'zustand/react'

export const useStage = create(() => ({
  geometry: new THREE.BoxGeometry(),
  floorMaterial: new THREE.MeshStandardMaterial({color: 'limegreen'}),
  floorTrapMaterial: new THREE.MeshStandardMaterial({color: 'lime'}),
  trapMaterial: new THREE.MeshStandardMaterial({color: 'red'}),
}))
