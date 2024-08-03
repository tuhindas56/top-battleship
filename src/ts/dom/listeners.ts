const drag = (event: DragEvent) => {
  const target = event.target as HTMLDivElement
  event.dataTransfer?.setData("text", target.id)
}

const allowDrop = (event: MouseEvent) => event.preventDefault()

const drop = (event: DragEvent) => {
  event.preventDefault()

  const ships = document.querySelectorAll(".ship") as NodeListOf<HTMLElement>
  const data = event.dataTransfer?.getData("text")
  const target = event.target as HTMLElement

  if (![...ships].some((item) => item === target)) {
    const ship = document.querySelector(`#${data}`) as HTMLDivElement
    ship.classList.add("placed")
    target.appendChild(ship)
  }
}

const highlightShip = (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement
  target.classList.add("ship-highlight")
}

const removeShipHighlight = (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement
  target.classList.remove("ship-highlight")
}

export const rotateShips = () => {
  const ships = document.querySelectorAll(".ship:not(.placed)")
  const shipContainer = document.querySelector(".ships") as HTMLDivElement

  shipContainer.classList.toggle("grid-flow-col")
  ships.forEach((ship) => ship.classList.toggle("vertical"))
}

const setupListeners = () => {
  const gridCells = document.querySelectorAll(".square") as NodeListOf<HTMLButtonElement>
  const ships = document.querySelectorAll(".ship") as NodeListOf<HTMLDivElement>
  const switchOrientation = document.querySelector(".switch-orientation") as HTMLButtonElement

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", (event) => {
      drag(event)
      highlightShip(event)
    })
    ship.addEventListener("dragend", removeShipHighlight)
  })

  gridCells.forEach((cell) => {
    cell.addEventListener("dragover", (event) => {
      cell.classList.add("hovered")
      allowDrop(event)
    })
    cell.addEventListener("dragleave", () => cell.classList.remove("hovered"))
    cell.addEventListener("drop", drop)
  })

  switchOrientation.onclick = rotateShips
}

export default setupListeners
