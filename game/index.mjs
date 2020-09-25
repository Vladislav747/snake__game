import { runGame } from './coreMechanic.mjs'
import { startGame, getNextCommand } from './game.mjs'
import { renderField } from './visualizer.mjs'

//Отсчет ведем с нуля
//19 уровень
// const maxTicks = 100;
// const snake = ['0;0', '1;0', '2;0', '3;0']
// const meals = ['1;1', '1;2', '2;1', '3;0']
// const fieldSize = 4
// const maxTicks = 50

const snake = ['0;0', '1;0', '2;0', '3;0']
const meals = ['1;1', '1;2', '2;1', '3;0']
const fieldSize = 4
const maxTicks = 50

async function run() {
    /*Объект игры
        сама змея - snake - параметры ее расположения

    */
    //runGame - функция генератор
    console.log('Проходим тест Маленькое поле')
    const iterGame = runGame(snake, meals, fieldSize, maxTicks)
    //runGame - функция генератор позволяет с помощью функцию next каждое значение при изменении
    let gameState = iterGame.next().value

    //Передаем изначальные данные (положение семьи, положение еды, размер поля, количество движений змеи)
    //наша функция
    startGame([...snake], [...meals], fieldSize, maxTicks)

    do {
        await renderField(
            [...gameState.snake],
            gameState.currentMeal,
            fieldSize
        )
        const currentCommand = getNextCommand(
            [...gameState.snake],
            gameState.currentMeal
        )
        console.log(currentCommand, 'comand')
        gameState = iterGame.next(currentCommand).value
    } while (!gameState.gameOver)

    console.log(`Your Score is ${gameState.maxScore}`)
}

run()
