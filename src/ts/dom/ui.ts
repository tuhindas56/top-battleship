const main = document.querySelector("main") as HTMLElement
const parentContainer = document.querySelector(".container") as HTMLDivElement

const setupLabels = () => {
  const rows = document.createElement("div") as HTMLDivElement
  const columns = document.createElement("div") as HTMLDivElement
  const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J"]

  rows.className = "rows"
  columns.className = "columns"

  alphabet.forEach((letter, index) => {
    const column = document.createElement("span") as HTMLSpanElement
    const row = document.createElement("span") as HTMLSpanElement

    column.textContent = `${index}`
    row.textContent = letter

    columns.appendChild(column)
    rows.appendChild(row)
  })

  parentContainer.appendChild(rows)
  parentContainer.appendChild(columns)
  main.appendChild(parentContainer)
}

const createGrid = () => {
  const gridContainer = document.createElement("div") as HTMLDivElement

  gridContainer.className = "grid-container"

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const button = document.createElement("button")
      button.className = "square"
      button.dataset.row = `${i}`
      button.dataset.column = `${j}`
      gridContainer.appendChild(button)
    }
  }

  parentContainer.appendChild(gridContainer)
}

const setupGrid = () => {
  setupLabels()
  createGrid()
}

export default setupGrid
