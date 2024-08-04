import Player from "../player/player"
import {
  allowDrop,
  drag,
  drop,
  highlightShip,
  placeShips,
  removeShipHighlight,
  rotateShips,
} from "./domControllerUtils"
import { setupGrid } from "./ui"

const computerContainer = document.querySelector(".container#computer") as HTMLDivElement
const playerContainer = document.querySelector(".container#player") as HTMLDivElement

let currentOrientation: "horizontal" | "vertical" = "horizontal"
const computer = new Player()
const player = new Player()
let currentTurn = "player"

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
      cell.classList.add("hovered")
    })
    cell.addEventListener("dragleave", () => cell.classList.remove("hovered"))
    cell.addEventListener("drop", drop)
  })
}

const setupOrientationSwitching = () => {
  const switchOrientation = document.querySelector(".switch-orientation") as HTMLButtonElement
  switchOrientation.addEventListener("click", () => {
    currentOrientation = rotateShips(currentOrientation)
  })
}

const setupShipPlacement = (player1: Player, player2: Player) => {
  playerContainer.addEventListener("shipPlaced", ((event: CustomEvent) => {
    placeShips(event, currentTurn === "player" ? player1 : player2, currentOrientation)
  }) as EventListener)
}

setupGrid(playerContainer)
setupDragAndDrop()
setupOrientationSwitching()
setupShipPlacement(player, computer)
