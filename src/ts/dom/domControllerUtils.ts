import Player from "../player/player"

export const drag = (event: DragEvent) => {
  const target = event.target as HTMLDivElement
  event.dataTransfer?.setData("text", target.id)
}

export const allowDrop = (event: MouseEvent) => event.preventDefault()

const checkDroppingConditions = (target: HTMLElement) => {
  const ships = document.querySelectorAll(".ship") as NodeListOf<HTMLElement>
  return ![...ships].some((item) => item === target)
}

export const drop = (event: DragEvent) => {
  event.preventDefault()

  const data = event.dataTransfer?.getData("text")
  const target = event.target as HTMLElement

  if (checkDroppingConditions(target)) {
    const ship = document.querySelector(`#${data}`) as HTMLDivElement
    ship.classList.add("placed")
    target.appendChild(ship)

    const shipPlacementEvent = new CustomEvent("shipPlaced", {
      bubbles: true,
      detail: target,
    })
    ship.dispatchEvent(shipPlacementEvent)
  }
}

export const highlightShip = (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement
  target.classList.add("ship-highlight")
}

export const removeShipHighlight = (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement
  target.classList.remove("ship-highlight")
}

export const rotateShips = (orientation: "horizontal" | "vertical") => {
  const ships = document.querySelectorAll(".ship:not(.placed)")
  const shipContainer = document.querySelector(".ships") as HTMLDivElement

  shipContainer.classList.toggle("grid-flow-col")
  ships.forEach((ship) => ship.classList.toggle("vertical"))

  return orientation === "horizontal" ? "vertical" : "horizontal"
}

export const placeShips = (
  event: CustomEvent,
  player: Player,
  currentOrientation: "horizontal" | "vertical",
) => {
  type Ships = "carrier" | "battleship" | "destroyer" | "submarine" | "patrolBoat"
  const shipsContainer = document.querySelector(".ships") as HTMLDivElement
  const target = event.target as HTMLDivElement
  const cell = event.detail
  const shipType: Ships = target.id as Ships
  const [row, column] = [+cell.dataset.row, +cell.dataset.column]

  try {
    player.gameBoard.placeShip(player.ships[shipType], {
      row,
      column,
      vertical: currentOrientation !== "horizontal",
    })
  } catch (error) {
    const temp = target
    target.remove()
    cell.classList.remove("hovered")
    temp.className = currentOrientation !== "horizontal" ? "ship vertical" : "ship"
    shipsContainer.appendChild(temp)
  }
}
