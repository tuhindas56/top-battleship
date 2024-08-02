const header = document.querySelector("header") as HTMLElement
const main = document.querySelector("main") as HTMLElement
const footer = document.querySelector("footer") as HTMLElement

const parentContainer = document.createElement("div") as HTMLDivElement
parentContainer.className = "container"

const setupHeading = () => {
  const heading = document.createElement("p") as HTMLParagraphElement

  heading.className = "heading"
  heading.innerHTML =
    'Battleship<span> built by <a href="https://github.com/tuhindas56/" target="_blank" rel="noopener noreferrer">Tuhin Das</a></span>'

  header.appendChild(heading)
}

const setupInfoText = () => {
  const text = document.createElement("p") as HTMLParagraphElement

  text.className = "text"
  text.textContent = "Place your ships"

  main.appendChild(text)
}

const setupLabels = () => {
  const rows = document.createElement("div") as HTMLDivElement
  const columns = document.createElement("div") as HTMLDivElement
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

  rows.className = "rows"
  columns.className = "columns"

  alphabet.forEach((letter) => {
    const span = document.createElement("span") as HTMLSpanElement
    span.textContent = letter
    rows.appendChild(span)
  })

  for (let i = 0; i < 10; i += 1) {
    const span = document.createElement("span") as HTMLSpanElement
    span.textContent = `${i}`
    columns.appendChild(span)
  }

  parentContainer.appendChild(rows)
  parentContainer.appendChild(columns)
  main.appendChild(parentContainer)
}

const setupGridInDOM = () => {
  const gridContainer = document.createElement("div") as HTMLDivElement

  gridContainer.className = "grid-container"

  for (let i = 0; i < 100; i += 1) {
    const button = document.createElement("button")
    button.className = "square"
    gridContainer.appendChild(button)
  }

  parentContainer.appendChild(gridContainer)
}

const setupShipPickingArea = () => {
  const shipContainer = document.createElement("div") as HTMLDivElement
  const shipNames = ["carrier", "battleship", "destroyer", "submarine", "patrol-boat"]

  shipContainer.className = "ships"

  shipNames.forEach((name) => {
    const ship = document.createElement("div") as HTMLDivElement
    ship.className = `ship`
    ship.id = name
    ship.draggable = true
    shipContainer.appendChild(ship)
  })

  main.appendChild(shipContainer)
}

const setupFooter = () => {
  const footerText = document.createElement("p") as HTMLParagraphElement
  footerText.textContent = "Battleship icon by Icons8"
  footer.appendChild(footerText)
}

const setupUI = () => {
  setupHeading()
  setupInfoText()
  setupLabels()
  setupGridInDOM()
  setupShipPickingArea()
  setupFooter()
}

export default setupUI
