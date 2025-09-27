/**
 * @description Player manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {World, Ray} from '@dimforge/rapier3d'
import {vec3} from '@react-three/rapier'
import type {ControlState, Vec3} from '../types'
import {config as baseConfig} from '../etc/config.ts'

export class PlayerManager {
  /**
   * @type {object}
   */
  readonly #config: typeof baseConfig.player

  /**
   * Constructor
   *
   * @param {object} config
   */
  constructor(config: typeof baseConfig.player) {
    this.#config = config
  }

  /**
   * Move
   *
   * @param   {number} deltaTime
   * @param   {{
   *              forward: boolean;
   *              rightward: boolean;
   *              backward: boolean;
   *              leftward: boolean;
   *              jump: boolean
   *          }} control
   * @returns {[Vec3, Vec3]}
   */
  move(deltaTime: number, control: ControlState): [Vec3, Vec3] {
    const force = {x: 0, y: 0, z: 0}
    const torque = {x: 0, y: 0, z: 0}

    if (control.forward || control.backward) {
      force.z +=
        this.#config.control.force * (-1) ** Number(control.forward) * deltaTime
      torque.x +=
        this.#config.control.torque *
        (-1) ** Number(control.forward) *
        deltaTime
    }

    if (control.leftward || control.rightward) {
      force.x +=
        this.#config.control.force *
        (-1) ** Number(control.leftward) *
        deltaTime
      torque.z +=
        this.#config.control.torque *
        (-1) ** Number(control.rightward) *
        deltaTime
    }

    return [vec3(force), vec3(torque)]
  }

  /**
   * Jump
   *
   * @param   {{x: number; y: number, z: number}} origin
   * @param   {World}                             world
   * @returns {number}
   */
  jump(origin: Vec3, world: World): number {
    const direction = {x: 0, y: -1, z: 0}

    /**
     * @note Current player position is calculated from its center.
     *       That is why we need to subtract half its height and a
     *       little more to cast the ray just below the player
     */
    origin.y -=
      this.#config.height * 0.5 - this.#config.control.jump.ray.displacement

    const ray = this.#createRay(origin, direction)
    const hit = world.castRay(ray, this.#config.control.jump.ray.maxToi, true)
    if (hit && hit?.timeOfImpact < this.#config.control.jump.maxDistance) {
      return this.#config.control.jump.force
    }

    return 0
  }

  /**
   * Create ray
   *
   * @param   {{x: number, y: number, z: number}} origin
   * @param   {{x: number, y: number, z: number}} destination
   * @returns {Ray}
   */
  #createRay(origin: Vec3, destination: Vec3): Ray {
    return new Ray(vec3(origin), vec3(destination))
  }
}
