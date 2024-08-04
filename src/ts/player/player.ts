import Gameboard from "../gameBoard/gameBoard"
import Ship from "../ship/ship"

export default class Player {
  gameBoard: Gameboard
  ships: {
    carrier: Ship
    battleship: Ship
    destroyer: Ship
    submarine: Ship
    patrolBoat: Ship
  }

  constructor() {
    this.gameBoard = new Gameboard()
    this.ships = {
      carrier: new Ship("carrier", 5),
      battleship: new Ship("battleship", 4),
      destroyer: new Ship("destroyer", 3),
      submarine: new Ship("submarine", 3),
      patrolBoat: new Ship("patrol-boat", 2),
    }
  }
}
