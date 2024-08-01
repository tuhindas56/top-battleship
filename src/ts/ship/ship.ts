export default class Ship {
  type: string
  size: number
  numberOfTimesHit: number = 0

  constructor(type: string, size: number) {
    this.type = type
    this.size = size
  }

  hit() {
    this.numberOfTimesHit += 1
    return this.numberOfTimesHit
  }

  isSunk() {
    return this.size === this.numberOfTimesHit
  }
}
