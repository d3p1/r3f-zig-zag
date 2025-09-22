/**
 * @description Config
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export const config = {
  floor: {
    position: {
      y: 0,
    },
    width: 4,
    height: 4,
    depth: 0.25,
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
    details: 1,
    control: {
      force: 0.5,
      torque: 0.05,
      get jump() {
        return config.player.control.force * 5
      },
      damping: {
        linear: 0.5,
        angular: 0.5,
      },
    },
  },
}
