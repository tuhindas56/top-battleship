import Gameboard from "../gameBoard/gameBoard"
import Computer from "./computer"

describe("Tests for player module", () => {
  let computer: Computer
  beforeEach(() => {
    computer = new Computer()
  })

  test("Players should have their own gameBoards", () => {
    expect(computer.gameBoard).toBeInstanceOf(Gameboard)
  })
})
