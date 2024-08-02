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

  if (![...ships].some((item) => item === target))
    target.appendChild(document.querySelector(`#${data}`)!)
}

const highlightShip = (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement
  target.classList.add("ship-highlight")
}

const removeShipHighlight = (event: MouseEvent) => {
  const target = event.target as HTMLButtonElement
  target.classList.remove("ship-highlight")
}

const setupListeners = () => {
  const gridCells = document.querySelectorAll(".square") as NodeListOf<HTMLButtonElement>
  const ships = document.querySelectorAll(".ship") as NodeListOf<HTMLDivElement>

  ships.forEach((ship) => {
    ship.addEventListener("dragstart", (event) => {
      drag(event)
      highlightShip(event)
    })

    ship.addEventListener("dragend", (event) => {
      removeShipHighlight(event)
    })
  })

  gridCells.forEach((cell) => {
    cell.addEventListener("dragover", allowDrop)
    cell.addEventListener("drop", drop)
  })
}

export default setupListeners
