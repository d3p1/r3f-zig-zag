/**
 * @description Timer manager
 * @author      C. M. de Picciotto <d3p1@d3p1.dev> (https://d3p1.dev/)
 */
export class TimerManager {
  /**
   * Process game elapsed time
   *
   * @param   {number}  startTime
   * @param   {number}  finishTime
   * @param   {number}  currentTime
   * @param   {boolean} isFinishedGame
   * @returns {number}
   */
  static processGameElapsedTime(
    startTime: number,
    finishTime: number,
    currentTime: number,
    isFinishedGame: boolean,
  ): number {
    let time
    if (isFinishedGame) {
      time = finishTime - startTime
    } else {
      time = currentTime - startTime
    }
    return time * 0.001
  }
}
