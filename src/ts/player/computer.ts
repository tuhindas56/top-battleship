import Player from "./player"
import Ship from "../ship/ship"

export default class Computer extends Player {
  constructor() {
    super()
  }

  static returnRandomNumber() {
    return Math.floor(Math.random() * 10)
  }

  static returnRandomBoolean() {
    return Math.floor(Math.random() * 2) === 1
  }

  autoPlaceShips() {
    const ships = Array.from(Object.values(this.ships))

    ships.forEach((item) => {
      const helper = (ship: Ship) => {
        const [row, column, vertical] = [
          Computer.returnRandomNumber(),
          Computer.returnRandomNumber(),
          Computer.returnRandomBoolean(),
        ]

        if (this.gameBoard.placeShip(ship, { row, column, vertical }) === "placed") return

        helper(ship)
      }

      helper(item)
    })
  }
}
