/**
 * @description Player manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
import {World, Ray} from '@dimforge/rapier3d'
import {type RapierRigidBody, vec3} from '@react-three/rapier'
import type {ControlState, Vec3} from '../types'
import {config as baseConfig} from '../etc/config.ts'

export class PlayerManager {
  /**
   * @type {RapierRigidBody}
   */
  readonly #player: RapierRigidBody

  /**
   * @type {World}
   */
  readonly #world: World

  /**
   * @type {object}
   */
  readonly #config: typeof baseConfig.player

  /**
   * Constructor
   *
   * @param {RapierRigidBody} player
   * @param {World}           world
   * @param {object}          config
   */
  constructor(
    player: RapierRigidBody,
    world: World,
    config: typeof baseConfig.player,
  ) {
    this.#player = player
    this.#world = world
    this.#config = config
  }

  /**
   * Move
   *
   * @param   {{forward: boolean, rightward: boolean, backward: boolean, leftward: boolean, jump: boolean}} control
   * @returns {void}
   */
  move(control: ControlState): void {
    const force = {x: 0, y: 0, z: 0}
    const torque = {x: 0, y: 0, z: 0}

    if (control.forward || control.backward) {
      force.z += this.#config.control.force * (-1) ** Number(control.forward)
      torque.x += this.#config.control.torque * (-1) ** Number(control.forward)
    }

    if (control.leftward || control.rightward) {
      force.x += this.#config.control.force * (-1) ** Number(control.leftward)
      torque.z +=
        this.#config.control.torque * (-1) ** Number(control.rightward)
    }

    if (control.jump) {
      force.y += this.#processJump()
    }

    this.#player.applyImpulse(vec3(force), true)
    this.#player.applyTorqueImpulse(vec3(torque), true)
  }

  /**
   * Process jump
   *
   * @returns {number}
   */
  #processJump(): number {
    const direction = {x: 0, y: -1, z: 0}
    const origin = this.#player.translation()

    /**
     * @note Current player position is calculated from its center.
     *       That is why we need to subtract half its height and a
     *       little more to cast the ray just below the player
     */
    origin.y -=
      this.#config.height * 0.5 - this.#config.control.jump.ray.displacement

    const ray = this.#createRay(origin, direction)
    const hit = this.#world.castRay(
      ray,
      this.#config.control.jump.ray.maxToi,
      true,
    )
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
