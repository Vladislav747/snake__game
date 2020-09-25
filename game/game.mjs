import { commands } from './coreMechanic.mjs'

var raznica = 0

var fieldSizeBoundaries = []

export function startGame(snake, meals, fieldSize, maxTicks) {
    //Чтобы не врезаться в стену
    fieldSizeBoundaries = fieldSize
}

//Движение объекта
const directionsShift = {
    up: { name: 'up', x: 0, y: -1 },
    down: { name: 'down', x: 0, y: 1 },
    left: { name: 'left', x: -1, y: 0 },
    right: { name: 'right', x: 1, y: 0 },
}

export function getNextCommand(snake, meal) {
    // console.log({snake, meal}, "getNextCommand");
    //Куда будем двигаться?

    if (meal) {
        //Первый элмент массива это x а второй y
        const [mealX, mealY] = meal.split(';')

        //Голова змеи - split - Метод split возвращает новый массив. из 4;0 идет массив [4,0]
        const [headX, headY] = snake[0].split(';')
        //Шея змеи - split
        const [neckX, neckY] = snake[1].split(';')
        //Сдвиг головы относительно шеи по Оси X
        const xShift = headX - neckX
        //Сдвиг головы относительно шеи по Оси Y
        const yShift = headY - neckY

        /*Если впереди стена то сначала ее обойдем */
        if (fieldSizeBoundaries - 1 == headX && headY == 0 && xShift == 1) {
            return commands.TURN_RIGHT
        }

        if (
            fieldSizeBoundaries - 1 == headY &&
            headX == fieldSizeBoundaries - 1 &&
            yShift == 1
        ) {
            return commands.TURN_RIGHT
        }

        if (
            fieldSizeBoundaries - 1 == headY &&
            headX == fieldSizeBoundaries - 1 &&
            yShift == 1
        ) {
            return commands.TURN_LEFT
        }

        if (
            fieldSizeBoundaries - 1 == headY &&
            headX == fieldSizeBoundaries - 1 &&
            xShift == 1
        ) {
            return commands.TURN_LEFT
        }

        if (fieldSizeBoundaries - 1 == headY && headX == 0 && yShift == 1) {
            return commands.TURN_LEFT
        }

        if (headY == 0 && headX == 0 && xShift == -1) {
            return commands.TURN_LEFT
        }

        //Змейка не врезайся в себя...

        //Змейка ищет еду
        if (raznica == 0) {
            //Еда находится параллельно оси X
            if (mealY > headY && headX == mealX && xShift == -1)
                return commands.TURN_LEFT
            if (mealY > headY && headX == mealX && xShift == 1)
                return commands.TURN_RIGHT
            //Еда находится параллельно оси Y
            if (mealY == headY && headX < mealX && yShift == 1)
                return commands.TURN_LEFT
            if (mealY == headY && headX > mealX && yShift == 1)
                return commands.TURN_RIGHT
            if (mealY == headY && headX > mealX && yShift == -1)
                return commands.TURN_LEFT

            //Еда находится позади
            if (mealY > headY && headX == mealX && yShift == -1)
                return commands.TURN_RIGHT

            if (mealY > headY && headX > mealX && yShift == -1)
                return commands.TURN_LEFT

            //Еда находится параллельно

            if (mealY == headY && headX > mealX && xShift == -1) {
                raznica = headX - mealX - 1
                return commands.FORWARD
            }

            if (mealY > headY && headX == mealX && yShift == 1) {
                raznica = mealY - headY - 1
                return commands.FORWARD
            }
            if (mealY < headY && headX == mealX && yShift == -1) {
                raznica = headY - mealY - 1
                return commands.FORWARD
            }

            if (mealY < headY && headX == mealX && xShift == 1) {
                return commands.TURN_LEFT
            }
            if (mealY < headY && headX == mealX && xShift == -1) {
                return commands.TURN_RIGHT
            }

            if (mealY == headY && headX > mealX && xShift == 1) {
                raznica = headX - mealX - 1
                return commands.FORWARD
            }
            if (mealY == headY && headX < mealX && xShift == 1) {
                raznica = mealX - headX - 1
                return commands.FORWARD
            }

            //Диагональные движения
            if (mealY > headY && headX > mealX && xShift == 1)
                return commands.TURN_RIGHT
            if (mealY > headY && headX > mealX && yShift == 1)
                return commands.TURN_RIGHT
            if (mealY > headY && headX < mealX && yShift == 1)
                return commands.TURN_LEFT
            if (mealY > headY && headX < mealX && xShift == 1)
                return commands.TURN_RIGHT

            //Диагональные движения
            if (mealY < headY && headX > mealX && xShift == -1)
                return commands.TURN_RIGHT
            if (mealY > headY && headX > mealX && xShift == -1)
                return commands.TURN_LEFT

            if (mealY < headY && headX > mealX && yShift == -1)
                return commands.TURN_LEFT
            if (mealY < headY && headX < mealX && yShift == -1)
                return commands.TURN_RIGHT
            if (mealY < headY && headX < mealX && xShift == 1)
                return commands.TURN_LEFT
        } else {
            raznica--
            return commands.FORWARD
        }
    }
}
