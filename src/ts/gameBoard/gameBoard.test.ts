import Ship from "../ship/ship"
import Gameboard from "./gameBoard"

describe("Tests for the Gameboard", () => {
  let gameBoard: Gameboard

  beforeAll(() => {
    gameBoard = new Gameboard()
  })

  test("Gameboard.placeShip() should be able to place ships at specific coordinates", () => {
    const ships: [
      Ship,
      {
        row: number
        column: number
        vertical: boolean
      },
    ][] = [
      [
        new Ship("destroyer", 3),
        {
          row: 6,
          column: 4,
          vertical: false,
        },
      ],
      [
        new Ship("battleship", 4),
        {
          row: 0,
          column: 0,
          vertical: true,
        },
      ],
      [
        new Ship("submarine", 3),
        {
          row: 0,
          column: 1,
          vertical: false,
        },
      ],
      [
        new Ship("patrolBoat", 2),
        {
          row: 0,
          column: 4,
          vertical: true,
        },
      ],
    ]

    ships.forEach(([ship, coordinates]) => {
      expect(gameBoard.placeShip(ship, coordinates)).toBe("placed")
    })
  })

  test("Gameboard.placeShip() should throw error if ship size reaches out of bounds", () => {
    expect(() =>
      gameBoard.placeShip(new Ship("carrier", 5), {
        row: 2,
        column: 6,
        vertical: false,
      }),
    ).toThrow(new RangeError("Ship cannot be placed at current coordinate"))
  })

  test("Gameboard.receiveAttack() should correctly determine if a ship was hit", () => {
    expect(gameBoard.receiveAttack({ row: 0, column: 0 })).toBe("hit")
  })

  test("Gameboard.receiveAttack() should correctly determine if a hit was missed", () => {
    expect(gameBoard.receiveAttack({ row: 9, column: 0 })).toBe("miss")
  })

  test("Gameboard.receiveAttack() should throw an error if previously attacked coordinate is attacked", () => {
    expect(() => gameBoard.receiveAttack({ row: 0, column: 0 })).toThrow(
      "Cannot attack same coordinate more than once",
    )
  })

  test("Gameboard.receiveAttack() should correctly determine if a ship was sunk", () => {
    gameBoard.receiveAttack({ row: 1, column: 0 })
    gameBoard.receiveAttack({ row: 2, column: 0 })
    expect(gameBoard.receiveAttack({ row: 3, column: 0 })).toBe("battleship sunk")
  })

  test("Gameboard should keep track of missed attacks", () => {
    expect(gameBoard.missedAttacks).toEqual([
      {
        row: 9,
        column: 0,
      },
    ])
  })

  test("Gameboard should report whether all ships have been sunk", () => {
    // Sink destroyer
    gameBoard.receiveAttack({ row: 6, column: 4 })
    gameBoard.receiveAttack({ row: 6, column: 5 })
    gameBoard.receiveAttack({ row: 6, column: 6 })
    // Sink submarine
    gameBoard.receiveAttack({ row: 0, column: 1 })
    gameBoard.receiveAttack({ row: 0, column: 2 })
    gameBoard.receiveAttack({ row: 0, column: 3 })
    // Sink  patrolBoat
    gameBoard.receiveAttack({ row: 0, column: 4 })
    gameBoard.receiveAttack({ row: 1, column: 4 })
    // Sink carrier
    gameBoard.receiveAttack({ row: 0, column: 9 })
    gameBoard.receiveAttack({ row: 1, column: 9 })
    gameBoard.receiveAttack({ row: 2, column: 9 })
    gameBoard.receiveAttack({ row: 3, column: 9 })

    expect(gameBoard.receiveAttack({ row: 4, column: 9 })).toBe("all ships sunk")
  })
})
