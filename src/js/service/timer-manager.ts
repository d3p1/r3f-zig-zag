/**
 * @description Timer manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export class TimerManager {
  /**
   * Process game elapsed time
   *
   * @param   {number}  timeStart
   * @param   {number}  timeFinish
   * @param   {number}  currentTime
   * @param   {boolean} isFinishedGame
   * @returns {number}
   */
  static processGameElapsedTime(
    timeStart: number,
    timeFinish: number,
    currentTime: number,
    isFinishedGame: boolean,
  ): number {
    let time
    if (isFinishedGame) {
      time = timeFinish - timeStart
    } else {
      time = currentTime - timeStart
    }
    return time * 0.001
  }
}
