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
