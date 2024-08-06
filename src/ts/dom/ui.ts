import { updateTextDisplay } from "./domControllerUtils"

const main = document.querySelector("main") as HTMLElement

const setupLabels = (container: HTMLDivElement) => {
  const rows = document.createElement("div") as HTMLDivElement
  const columns = document.createElement("div") as HTMLDivElement

  rows.className = "rows"
  columns.className = "columns"

  for (let i = 0; i < 10; i += 1) {
    const column = document.createElement("span") as HTMLSpanElement
    const row = document.createElement("span") as HTMLSpanElement

    column.textContent = `${i}`
    row.textContent = `${i}`

    columns.appendChild(column)
    rows.appendChild(row)
  }

  container.appendChild(rows)
  container.appendChild(columns)
  main.appendChild(container)
}

const createGrid = (container: HTMLDivElement, computer?: boolean) => {
  const gridContainer = document.createElement("div") as HTMLDivElement

  gridContainer.className = "grid-container"

  for (let i = 0; i < 10; i += 1) {
    for (let j = 0; j < 10; j += 1) {
      const button = document.createElement("button")

      button.className = "square"

      button.dataset.row = `${i}`
      button.dataset.column = `${j}`

      if (computer) {
        button.style.cursor = "pointer"
        button.classList.add("hovered")
      }

      gridContainer.appendChild(button)
    }
  }

  container.appendChild(gridContainer)
}

export const setupGrid = (container: HTMLDivElement, computer = false) => {
  setupLabels(container)
  createGrid(container, computer)
}

export const switchView = () => {
  const playerContainer = document.querySelector(".container#player") as HTMLDivElement
  const shipContainer = main.querySelector(".ships") as HTMLDivElement
  const switchOrientation = document.querySelector(".switch-orientation") as HTMLButtonElement
  const acceptBtn = document.querySelector(".button.accept") as HTMLButtonElement
  const textDisplay = document.querySelector(".text") as HTMLParagraphElement

  playerContainer.classList.add("disableClick", "lowOpacity")
  shipContainer.classList.add("hidden")
  switchOrientation.classList.add("hidden")
  acceptBtn.classList.add("hidden")

  textDisplay.style.gridColumn = "1 / -1"
}

export const showWinner = (winner: string) => {
  const computerContainer = document.querySelector(".container#computer") as HTMLDivElement
  const playerContainer = document.querySelector(".container#player") as HTMLDivElement

  playerContainer.classList.add("disableClick", "lowOpacity")
  computerContainer.classList.add("disableClick", "lowOpacity")

  updateTextDisplay(winner === "player" ? "You win!" : "Computer wins.")
}
