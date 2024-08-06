import Computer from "../player/computer"
import Player from "../player/player"
import GameController from "./gameController"

describe("Tests for the gameController", () => {
  test("Game controller should initialize a real and computer player", () => {
    expect(GameController.computer).toBeInstanceOf(Computer)
    expect(GameController.player).toBeInstanceOf(Player)
  })

  test("Game controller should keep track of player turn", () => {
    expect(GameController.currentTurn).toBe("player")
  })
})
