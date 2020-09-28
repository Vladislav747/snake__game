import { commands } from './coreMechanic.mjs'

var snakeController = {
    grid: [],
    finalMoves: [],

    getDistance: function (point1, point2) {
        let distanceX = point2.x - point1.x
        let distanceY = point2.y - point1.y

        return Math.sqrt(Math.pow(distanceX, 2) + Math.pow(distanceY, 2))
    },

    addNeighbour: function (neighbour) {
        let isNeighbourSnake = false

        for (let i = 0; i < this.snakeBody.length; i++) {
            if (
                neighbour.x == this.snakeBody[i].x &&
                neighbour.y == this.snakeBody[i].y
            ) {
                isNeighbourSnake = true
                break
            }
        }

        if (!isNeighbourSnake) {
            let tempG = this.current.steps + 1
            let tempH = this.getDistance(neighbour, this.mealPosition)
            let tempF = tempG + tempH
            if (tempF < neighbour.distanceFactor) {
                neighbour.cameFrom = this.current
                neighbour.steps = tempG
                neighbour.distance = tempH
                neighbour.distanceFactor = tempF
            }
            if (!this.movesVariants.includes(neighbour)) {
                this.movesVariants.push(neighbour)
            }
        }
    },
    getPath: function () {
        var head = this.snakeBody[0]
        this.movesVariants = [this.grid[head.x][head.y]]
        this.finalMoves = []

        while (this.movesVariants.length > 0) {
            this.current = this.movesVariants[0]
            this.movesVariants.splice(0, 1)
            this.finalMoves.push(this.current)

            if (
                this.current.x == this.mealPosition.x &&
                this.current.y == this.mealPosition.y
            ) {
                break
            }

            if (this.current.x < this.fieldSizeBoundaries - 1) {
                let neighbour = this.grid[this.current.x + 1][this.current.y]
                if (!this.finalMoves.includes(neighbour)) {
                    this.addNeighbour(neighbour)
                }
            }
            if (this.current.y < this.fieldSizeBoundaries - 1) {
                let neighbour = this.grid[this.current.x][this.current.y + 1]
                if (!this.finalMoves.includes(neighbour)) {
                    this.addNeighbour(neighbour)
                }
            }
            if (this.current.x > 0) {
                let neighbour = this.grid[this.current.x - 1][this.current.y]
                if (!this.finalMoves.includes(neighbour)) {
                    this.addNeighbour(neighbour)
                }
            }
            if (this.current.y > 0) {
                let neighbour = this.grid[this.current.x][this.current.y - 1]
                if (!this.finalMoves.includes(neighbour)) {
                    this.addNeighbour(neighbour)
                }
            }

            for (let r = this.movesVariants.length - 1; r > 0; r--) {
                if (
                    this.movesVariants[r].distanceFactor <
                    this.movesVariants[r - 1].distanceFactor
                ) {
                    let temp = this.movesVariants[r - 1]
                    this.movesVariants[r - 1] = this.movesVariants[r]
                    this.movesVariants[r] = temp
                }
            }
        }
        return this.movesVariants
    },
    initGrid: function () {
        for (let i = 0; i < this.fieldSizeBoundaries; i++) {
            this.grid[i] = new Array(this.fieldSizeBoundaries)
        }

        for (let i = 0; i < this.fieldSizeBoundaries; i++) {
            for (let j = 0; j < this.fieldSizeBoundaries; j++) {
                this.grid[i][j] = {
                    x: i,
                    y: j,
                    steps: 0,
                    distance: 0,
                    distanceFactor: 9999999,
                    cameFrom: 0,
                }
            }
        }
    },
    findPath: function (path) {
        let previous = ''
        var path = []
        for (let i = this.finalMoves.length - 1; i >= 0; i--) {
            if (i == this.finalMoves.length - 1 && previous == '') {
                previous = this.finalMoves[i]
                path.push(previous)
            } else if (
                previous.cameFrom.x == this.finalMoves[i].x &&
                previous.cameFrom.y == this.finalMoves[i].y
            ) {
                previous = this.finalMoves[i]
                path.push(previous)
            }
        }

        return path
    },

    getDirection: function (path) {
        let currentMove = path[path.length - 2]
        let headPosition = path[path.length - 1]
        let neckPosition = this.snakeBody[1]
        let result = 0

        if (!neckPosition) return 'TURN_LEFT'

        if (neckPosition.x == headPosition.x) {
            if (headPosition.y > neckPosition.y) {
                result = currentMove.x - headPosition.x
            } else {
                result = headPosition.x - currentMove.x
            }
        } else {
            if (headPosition.x > neckPosition.x) {
                result = headPosition.y - currentMove.y
            } else {
                result = currentMove.y - headPosition.y
            }
        }

        switch (result) {
            case -1:
                return 'TURN_RIGHT'
            case 1:
                return 'TURN_LEFT'
            default:
                return 'FORWARD'
        }
    },
}

export function startGame(snake, meals, fieldSize, maxTicks) {
    snakeController.fieldSizeBoundaries = fieldSize
}

export function getNextCommand(snake, meal) {
    let startPosition = {
        x: 0,
        y: 0,
    }
    if (meal) {
        let snakeBody = snake.map(function (el) {
            return {
                x: el.split(';')[0],
                y: el.split(';')[1],
            }
        })

        
        
        return commands[snakeController.getDirection(ourPath)]
    }
}
