import {
  allowDrop,
  drag,
  drop,
  highlightShip,
  removeShipHighlight,
  rotateShips,
} from "./domControllerUtils"
import { setupGrid } from "./ui"

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

setupGrid(playerContainer)
setupDragAndDrop()
setupOrientationSwitching()
