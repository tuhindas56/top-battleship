import Ship from "./ship"

describe("Test ship methods", () => {
  let ship: Ship

  beforeEach(() => {
    ship = new Ship("carrier", 5)
  })

  test("ship.hit() should increase numberOfHits on a ship", () => {
    expect(ship.hit()).toBe(1)
    expect(ship.hit()).toBe(2)
  })

  test("ship.isSunk() should return true if numberOfHits on a ship equals it's size and vice versa", () => {
    expect(ship.isSunk()).toBe(false)
    for (let i = 0; i < 5; i += 1) ship.hit()
    expect(ship.isSunk()).toBe(true)
  })
})
