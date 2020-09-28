import { runGame } from './coreMechanic.mjs'
import { startGame, getNextCommand } from './game.mjs'
import { renderField } from './visualizer.mjs'

//Отсчет ведем с нуля

const snake = ['4;4', '3;4', '2;4', '1;4']
const meals = [
    '3;3',
    '8;7',
    '6;1',
    '4;4',
    '2;1',
    '0;8',
    '3;7',
    '4;6',
    '1;5',
    '9;9',
    '1;3',
    '0;0',
    '5;1',
    '2;0',
    '5;1',
    '2;2',
    '0;7',
    '3;8',
    '4;6',
    '0;9',
    '8;9',
    '3;1',
    '7;1',
    '6;8',
    '5;4',
    '0;9',
    '0;0',
    '6;5',
    '8;8',
    '8;2',
    '7;3',
    '7;5',
    '8;9',
    '8;7',
    '3;6',
    '7;1',
    '7;6',
    '3;3',
    '4;7',
    '9;5',
    '1;7',
    '6;2',
    '2;3',
    '5;2',
    '0;8',
    '3;0',
    '6;2',
    '3;0',
    '3;1',
    '8;1',
    '3;7',
    '2;7',
    '7;9',
    '9;0',
    '1;8',
    '8;0',
    '8;3',
    '1;3',
    '9;4',
    '5;5',
    '8;9',
    '9;1',
    '5;3',
    '9;7',
    '8;2',
    '9;7',
    '8;7',
    '2;1',
    '8;1',
    '9;8',
    '5;5',
    '6;2',
    '0;5',
    '0;5',

    /* '2;1',
    '5;9',
    '1;0',
    '7;2',
    '5;6',
    '0;0',
    '9;5',
    '5;9',
    '9;5',
    '3;5',
    '2;6',
    '0;0',
    '8;6',
    '7;1',
    '1;8',
    '7;2',
    '3;7',
    '5;4',
    '3;1',
    '4;2',
    '2;7',
    '3;3',
    '1;4',
    '8;8',
    '2;1',
    '6;6',
    '2;5',
    '6;2',
    '0;7',
    '5;0',
    '1;2',
    '9;9',
    '4;8',
    '2;2',
    '5;6',
    '5;5',
    '4;6',
    '4;1',
    '7;7',
    '2;6',
    '4;3',
    '1;7',
    '9;4',
    '2;5',
    '7;1',
    '7;1',
    */
]
const fieldSize = 10
const maxTicks = 1000

async function run() {
    /*Объект игры
        сама змея - snake - параметры ее расположения

    */
    //runGame - функция генератор
    console.log('Проходим тест Level#1')
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
