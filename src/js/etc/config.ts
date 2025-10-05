/**
 * @description Config
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export const config = {
  world: {
    friction: 0,
    restitution: 0.2,
  },
  floor: {
    position: {
      y: 0,
    },
    width: 4,
    height: 4,
    depth: 0.25,
    friction: 1,
  },
  wall: {
    get height() {
      return config.player.height * 2
    },
    get depth() {
      return config.floor.depth
    },
  },
  trap: {
    twister: {
      get width() {
        return config.floor.width * 0.75
      },
      get height() {
        return config.floor.depth
      },
      get depth() {
        return config.trap.twister.height
      },
    },
    limbo: {
      get width() {
        return config.trap.twister.width
      },
      get height() {
        return config.trap.twister.height
      },
      get depth() {
        return config.trap.twister.depth
      },
    },
    axe: {
      get width() {
        return config.floor.width * 0.5
      },
      get height() {
        return config.trap.axe.width
      },
      get depth() {
        return config.floor.depth
      },
    },
  },
  player: {
    height: 1,
    friction: 1,
    details: 1,
    movement: {
      force: 3,
      torque: 0.3,
      jump: {
        get force() {
          return config.player.movement.force * 0.75
        },
        get maxDistance() {
          return config.wall.height * 0.05
        },
        ray: {
          get displacement() {
            return config.player.height * 0.5 + 0.1
          },
          maxToi: 10,
        },
      },
      damping: {
        linear: 0.5,
        angular: 0.5,
      },
    },
  },
  camera: {
    position: {
      x: 0,
      y: 25,
      z: 50,
      target: {
        displacement: {
          x: 0,
          z: 2.5,
          y: 1,
          factor: 1,
        },
      },
    },
    lookAt: {
      target: {
        displacement: {
          x: 0,
          y: 0,
          z: 1,
          factor: 1,
        },
      },
    },
  },
  light: {
    position: {
      target: {
        displacement: {
          get x() {
            return config.floor.width * 3
          },
          get y() {
            return config.wall.height * 2
          },
          z: 1,
        },
      },
    },
    lookAt: {
      target: {
        displacement: {
          x: 0,
          y: 0,
          z: 3,
        },
      },
    },
  },
}
