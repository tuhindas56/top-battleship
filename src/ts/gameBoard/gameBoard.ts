import Ship from "../ship/ship"

type Coordinate = { row: number; column: number; vertical?: boolean }

export default class Gameboard {
  gameBoard: Ship[][] = []
  attackedCoordinates: Set<string> = new Set()
  missedAttacks: Coordinate[] = []
  #numberOfShips: number = 0
  #shipsPlaced: Ship[] = []

  constructor() {
    for (let i = 0; i < 10; i += 1)
      this.gameBoard.push(new Array(10).fill(null))
  }

  #hasShip(ship: Ship) {
    return this.#shipsPlaced.some(
      (existingShip) => existingShip.type === ship.type,
    )
  }

  #checkIfAllShipsAreSunk() {
    return this.#shipsPlaced.every((ship) => ship.isSunk())
  }

  placeShip(ship: Ship, { row, column, vertical = false }: Coordinate) {
    if (this.#hasShip(ship)) {
      throw new TypeError("A ship of the same type was already placed") // Check if board already has a ship of the same type
    }
    if (this.#numberOfShips === 5) {
      throw new RangeError("Cannot place more than five ships") //  Check if board already has five ships
    }

    const range = vertical ? row + ship.size : column + ship.size
    if (range > 10) {
      throw new RangeError("Ship cannot be placed at current coordinate") // If ship placement exceeds bounds, throw an error
    }

    for (let i = 0; i < ship.size; i += 1) {
      if (vertical) {
        if (this.gameBoard[row + i][column]) {
          throw new Error("Ship placement range is not empty") // If a cell in the range of cells is occupied, throw an error
        }
        this.gameBoard[row + i][column] = ship // Else, place the ship
      } else {
        if (this.gameBoard[row][column + i]) {
          throw new Error("Ship placement range is not empty")
        }
        this.gameBoard[row][column + i] = ship
      }
    }

    this.#numberOfShips += 1 // Increment number of ships placed
    this.#shipsPlaced.push(ship) // Track type of ship placed

    return "placed"
  }

  receiveAttack({ row, column }: Coordinate) {
    if (this.attackedCoordinates.has(`{ ${row}, ${column}`)) {
      throw new Error("Cannot attack same coordinate more than once")
    }

    const ship = this.gameBoard[row][column]
    let outcome: string

    if (ship) {
      ship.hit()
      outcome = ship.isSunk() ? `${ship.type} sunk` : "hit"
    } else {
      this.missedAttacks.push({ row, column })
      outcome = "miss"
    }

    this.attackedCoordinates.add(`{ ${row}, ${column}`) // Keep track of attacked coordinates

    return this.#checkIfAllShipsAreSunk() ? "all ships sunk" : outcome
  }
}
