import Gameboard from "../gameBoard/gameBoard"
import Player from "./player"

describe("Tests for player module", () => {
  let player: Player
  beforeEach(() => {
    player = new Player()
  })

  test("Players should have their own gameBoards", () => {
    expect(player.gameBoard).toBeInstanceOf(Gameboard)
  })
})
