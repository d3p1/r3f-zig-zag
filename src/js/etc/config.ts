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
    height: 0.25,
    depth: 4,
  },
  trap: {
    twister: {
      get width() {
        return config.floor.width * 0.75
      },
      get height() {
        return config.floor.height
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
        return config.floor.height
      },
    },
  },
  player: {
    height: 1,
    details: 1,
  },
}
