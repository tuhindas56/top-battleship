import Ship from "../ship/ship"

type Coordinate = { row: number; column: number; vertical?: boolean }

export default class Gameboard {
  gameBoard: Ship[][] | null[][] = []
  attackedCoordinates: Set<string> = new Set()
  missedAttacks: Coordinate[] = []
  #shipsPlaced: Set<Ship> = new Set()

  constructor() {
    for (let i = 0; i < 10; i += 1) this.gameBoard.push(new Array(10).fill(null))
  }

  #hasShip(ship: Ship) {
    return this.#shipsPlaced.has(ship)
  }

  #checkIfAllShipsAreSunk() {
    return Array.from(this.#shipsPlaced).every((ship) => ship.isSunk())
  }

  placeShip(ship: Ship, { row, column, vertical = false }: Coordinate) {
    if (this.#hasShip(ship)) this.#removeShip(ship, vertical)

    const range = vertical ? row + ship.size : column + ship.size
    if (range > 10) return "Ship cannot be placed at current coordinate" // If ship placement exceeds bounds, exit

    for (let i = 0; i < ship.size; i += 1) {
      if (
        (vertical && this.gameBoard[row + i][column]) ||
        (!vertical && this.gameBoard[row][column + i])
      ) {
        return "Ship placement range is not empty" // If a cell in the range of cells is occupied, exit
      }
    }

    for (let i = 0; i < ship.size; i += 1) {
      if (vertical) {
        this.gameBoard[row + i][column] = ship // Place the ship
      } else {
        this.gameBoard[row][column + i] = ship
      }
    }

    this.#shipsPlaced.add(ship) // Track type of ship placed

    return "placed"
  }

  #removeShip(ship: Ship, vertical: boolean) {
    let column = 0
    let row = 0

    for (row; row < this.gameBoard.length; row += 1) {
      column = this.gameBoard[row].findIndex((placedShip) => placedShip === ship)
      if (!(column < 0)) break
    }

    for (let i = 0; i < ship.size; i += 1) {
      if (vertical) {
        this.gameBoard[row + i][column] = null
      } else {
        this.gameBoard[row][column + i] = null
      }
    }
  }

  receiveAttack({ row, column }: Coordinate) {
    const outcome = {
      shipType: "unknown",
      attackResult: "unknown",
      shipSunk: false,
      allShipsSunk: false,
    }

    if (this.attackedCoordinates.has(`{ ${row}, ${column}`)) {
      outcome.attackResult = "failed"
      return outcome
    }

    const ship = this.gameBoard[+row][+column]

    if (ship) {
      ship.hit()
      outcome.shipType = ship.type
      outcome.attackResult = "hit"
      outcome.shipSunk = ship.isSunk()
      outcome.allShipsSunk = this.#checkIfAllShipsAreSunk()
    } else {
      this.missedAttacks.push({ row, column })
      outcome.attackResult = "miss"
    }

    this.attackedCoordinates.add(`{ ${row}, ${column}`) // Keep track of attacked coordinates

    return outcome
  }
}
