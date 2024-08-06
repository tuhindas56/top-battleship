import gameController from "../gameController/gameController"
import { setupGrid, showWinner, switchView } from "./ui"
import {
  allowDrop,
  drag,
  drop,
  highlightShip,
  placeShips,
  removeShipHighlight,
  rotateShips,
  updateTextDisplay,
} from "./domControllerUtils"

const computerContainer = document.querySelector(".container#computer") as HTMLDivElement
const playerContainer = document.querySelector(".container#player") as HTMLDivElement

let currentOrientation: "horizontal" | "vertical" = "horizontal"

const setupDragAndDrop = () => {
  const gridCells = document.querySelectorAll(".square") as NodeListOf<HTMLButtonElement>
  const ships = document.querySelectorAll(".ship") as NodeListOf<HTMLDivElement>

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", (event) => {
      drag(event)
      highlightShip(event)
    })
    ship.addEventListener("dragend", removeShipHighlight)
  })

  gridCells.forEach((cell) => {
    cell.addEventListener("dragover", (event) => {
      allowDrop(event)
      cell.classList.add("dragging")
    })
    cell.addEventListener("dragleave", () => cell.classList.remove("dragging"))
    cell.addEventListener("drop", drop)
  })
}

const setupOrientationSwitching = () => {
  const switchOrientation = document.querySelector(".switch-orientation") as HTMLButtonElement
  switchOrientation.addEventListener("click", () => {
    currentOrientation = rotateShips(currentOrientation)
  })
}

const setupShipPlacement = (container: HTMLDivElement) => {
  const shipContainer = document.querySelector(".ships") as HTMLDivElement
  const ships = shipContainer.children
  const switchOrientation = document.querySelector(".switch-orientation") as HTMLButtonElement
  const acceptBtn = document.querySelector(".button.accept") as HTMLButtonElement
  const cellContainer = container.querySelector(".grid-container") as HTMLDivElement

  acceptBtn.disabled = true

  cellContainer.addEventListener("shipPlaced", ((event: CustomEvent) => {
    placeShips(event, gameController.player, currentOrientation)
    acceptBtn.disabled = ships.length !== 0
    switchOrientation.disabled = ships.length === 0
  }) as EventListener)
}

const attachListenersToCells = (container: HTMLDivElement) => {
  const cells = container.querySelectorAll(
    ".grid-container .square",
  ) as NodeListOf<HTMLButtonElement>

  cells.forEach((cell) => {
    cell.addEventListener(
      "click",
      (event: MouseEvent) => {
        const target = event.target as HTMLButtonElement

        target.classList.remove("hovered")
        target.style.cursor = "auto"

        const cellAttackedEvent = new CustomEvent("cellAttacked", {
          bubbles: true,
          detail: { row: cell.dataset.row, column: cell.dataset.column },
        })

        document.dispatchEvent(cellAttackedEvent)
      },
      { once: true },
    )
  })
}

const setupViewSwitch = () => {
  const acceptBtn = document.querySelector(".button.accept") as HTMLButtonElement

  acceptBtn.addEventListener("click", () => {
    switchView()
    setupGrid(computerContainer, true)
    attachListenersToCells(computerContainer)
    gameController.computer.autoPlaceShips()
    updateTextDisplay("Your turn")
  })
}

const setupAttackReception = () => {
  document.addEventListener("cellAttacked", ((event: CustomEvent) => {
    gameController.receiveAttack(event.detail)
  }) as EventListener)

  document.addEventListener("hit", ((event: CustomEvent) => {
    const {
      allShipsSunk,
      by,
      coordinate: { row, column },
      isSunk,
      shipType,
    } = event.detail

    if (!allShipsSunk) {
      if (isSunk) {
        updateTextDisplay(
          `${by === "player" ? "You have" : "Computer has"} destroyed a ${shipType}`,
        )
      } else {
        updateTextDisplay(`${by === "player" ? "You" : "Computer"} landed a hit on a ${shipType}`)
      }
    } else {
      showWinner(by)
    }

    const cell = document.querySelector(
      `${by !== "player" ? "#player" : "#computer"} .square[data-row='${row}'][data-column='${column}']`,
    ) as HTMLButtonElement
    cell.classList.add("hit")
  }) as EventListener)

  document.addEventListener("miss", ((event: CustomEvent) => {
    const {
      by,
      coordinate: { row, column },
    } = event.detail

    updateTextDisplay(`${by === "player" ? "You" : "Computer"} missed`)

    const cell = document.querySelector(
      `${by !== "player" ? "#player" : "#computer"} .square[data-row='${row}'][data-column='${column}']`,
    ) as HTMLButtonElement
    cell.classList.add("miss")
  }) as EventListener)

  document.addEventListener("changeturn", ((event: CustomEvent) => {
    if (event.detail === "computer") {
      computerContainer.classList.add("disableClick", "lowOpacity")
      playerContainer.classList.remove("disableClick", "lowOpacity")
      setTimeout(() => gameController.computerAttack(), 2000)
    } else {
      computerContainer.classList.remove("disableClick", "lowOpacity")
      playerContainer.classList.add("disableClick", "lowOpacity")
    }
  }) as EventListener)
}

setupGrid(playerContainer)
setupDragAndDrop()
setupOrientationSwitching()
setupShipPlacement(playerContainer)
setupViewSwitch()
setupAttackReception()
