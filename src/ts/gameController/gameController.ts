import Computer from "../player/computer"
import Player from "../player/player"

const gameController = {
  computer: new Computer(),
  player: new Player(),

  currentTurn: "player",

  receiveAttack(coordinate: { row: number; column: number }) {
    let outcome
    let attackResultEvent

    if (this.currentTurn === "player") {
      outcome = this.computer.gameBoard.receiveAttack(coordinate)
    } else {
      outcome = this.player.gameBoard.receiveAttack(coordinate)
    }

    switch (outcome.attackResult) {
      case "hit":
        attackResultEvent = new CustomEvent("hit", {
          bubbles: true,
          detail: {
            by: this.currentTurn,
            shipType: outcome.shipType,
            isSunk: outcome.shipSunk,
            allShipsSunk: outcome.allShipsSunk,
            coordinate,
          },
        })
        break

      case "miss":
        attackResultEvent = new CustomEvent("miss", {
          bubbles: true,
          detail: {
            by: this.currentTurn,
            coordinate,
          },
        })
        break

      default:
        return "failed"
    }

    const changeTurnEvent = new CustomEvent("changeturn", {
      bubbles: true,
      detail: this.switchTurn(),
    })

    if (!outcome.allShipsSunk) {
      this.dispatchEvents(attackResultEvent, changeTurnEvent)
    } else {
      this.dispatchEvents(attackResultEvent)
    }

    return outcome
  },

  computerAttack() {
    const [row, column] = [Computer.returnRandomNumber(), Computer.returnRandomNumber()]
    if (gameController.receiveAttack({ row, column }) !== "failed") return
    this.computerAttack()
  },

  switchTurn() {
    this.currentTurn = this.currentTurn === "player" ? "computer" : "player"
    return this.currentTurn
  },

  dispatchEvents(attackEvent: CustomEvent, turnSwitchEvent?: CustomEvent) {
    document.dispatchEvent(attackEvent)
    if (turnSwitchEvent) document.dispatchEvent(turnSwitchEvent)
  },
}
export default gameController
