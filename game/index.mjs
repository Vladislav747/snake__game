import { runGame } from './coreMechanic.mjs'
import { startGame, getNextCommand } from './game.mjs'
import { renderField } from './visualizer.mjs'

//Отсчет ведем с нуля
// const snake = [ '4;0', '3;0', '2;0', '1;0', '0;0' ];
// const meals = [ '3;5', '8;6'];
// const fieldSize = 10;
// const maxTicks = 100;
const snake = ['5;4', '5;5', '5;6', '5;7']
const meals = ['0;4']
const fieldSize = 10
const maxTicks = 10

async function run() {
    /*Объект игры
        сама змея - snake - параметры ее расположения

    */
    //runGame - функция генератор
    console.log('Проходим тест Еда возле стенки')
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
