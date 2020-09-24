export const commands = {
    FORWARD: "FORWARD",
    TURN_LEFT: "TURN_LEFT",
    TURN_RIGHT: "TURN_RIGHT",
}
const directions = [ 'up', 'right', 'down', 'left' ];

//Движение объекта
const directionsShift = {
    up: { name: 'up', x: 0, y: -1 },
    down: { name: 'down', x: 0, y: 1 },
    left: { name: 'left', x: -1, y: 0 },
    right: { name: 'right', x: 1, y: 0 },
}

//function* (ключевое слово function со звёздочкой) определяет функцию-генератор.
export function* runGame(snake, meals, fieldSize = 10, maxTickCount = 500) {
    //Создаем новый объект игры класса Game
    const game = new Game(snake, meals, fieldSize, maxTickCount);
    
    do {
        const command = yield { ...game };
        game.applyCommand(command);
        game.runNextTick();
    } while (true);
}

class Game {
    //Коэффицент длины
    static lengthCoefficient = 10;
    //Коэффицент времени
    static timeCoefficient = 1;

    constructor(snake, meals, fieldSize, maxTickCount) {
        this.snake = [ ...snake ];
        this.meals = [ ...meals ];
        this.fieldSize = fieldSize;
        this.currentMeal = meals[0];
        this.snakeDirection = this.getSnakeDirection();
        this.tick = 0;
        this.gameOver = false;
        this.maxTickCount = maxTickCount;
        this.maxScore = 0;
    }
    //Получить направление змеи
    getSnakeDirection() {
        //Голова змеи - split - Метод split возвращает новый массив. из 4;0 идет массив [4,0]
        const [ headX, headY ] = this.snake[0].split(';');
        //Шея змеи - split
        const [ neckX, neckY ] = this.snake[1].split(';');
        //Сдвиг головы относительно шеи по Оси X
        const xShift = headX - neckX;
        //Сдвиг головы относительно шеи по Оси Y
        const yShift = headY - neckY;

        //В зависимости от сдвига понять куда двигается земля
        if (yShift === 1) return directionsShift.down;
        if (yShift === -1) return directionsShift.up;
        if (xShift === 1) return directionsShift.right;
        if (xShift === -1) return directionsShift.left;
    }

    //Изменить движение змейки
    applyCommand(command) {
        //Получаем индекс команды
        const currentDirectionIndex = directions.findIndex((i) => i === this.snakeDirection.name);
        //новое положение змеи
        let newDirection;
        switch (command) {
            case commands.FORWARD:
                return;
            case commands.TURN_LEFT:
                newDirection = currentDirectionIndex - 1 === -1 ? 3 : currentDirectionIndex - 1;
                this.snakeDirection = directionsShift[directions[newDirection]];
                return;
            case commands.TURN_RIGHT:
                newDirection = (currentDirectionIndex + 1) % directions.length;
                this.snakeDirection = directionsShift[directions[newDirection]];
                return;
            default:
                this.gameOver = true;
                console.error(`Invalid command: ${ command }`);
        }
    }

    //Запустить следующий тик
    runNextTick() {
        //проверяем не конец ли это игры/
        if (this.gameOver) return;
        //Добавляем тик игры
        this.tick++;
        //Если количество тиков превышает допустимых то это конец игры
        if (this.tick > this.maxTickCount) {
            this.gameOver = true;
            console.log('Time is over');
            return;
        }

        this.moveSnake();
        this.updateScore();
    }

    //Передвинуть змею
    moveSnake() {
        //Узнаем где голова змеи
        const [ headX, headY ] = this.snake[0].split(';');
        //
        const newHeadX = parseInt(headX) + this.snakeDirection.x;
        const newHeadY = parseInt(headY) + this.snakeDirection.y;

        if (newHeadX < 0 || newHeadY < 0 || newHeadX >= this.fieldSize || newHeadY >= this.fieldSize) {
            this.gameOver = true;
            console.error('Snake is in the wall!');
            return;
        }
        const coord = `${ newHeadX };${ newHeadY }`;
        if (this.snake.includes(coord) && coord !== this.snake[this.snake.length - 1]) {
            this.gameOver = true;
            console.error('Snake ate itself!');
            return;
        }

        this.snake.unshift(coord);
        if (coord === this.currentMeal) {
            this.eatMeal();
        } else {
            this.snake.pop();
        }
    }

    //Съесть еду
    eatMeal() {
        this.meals.shift();
        this.currentMeal = this.meals[0];
        this.cutTheTail();

        if (this.meals.length === 0) {
            this.gameOver = true;
            console.log('Food is over');
        }
    }

    //Обрезать хвост
    cutTheTail() {
        const indexOfFood = this.snake.indexOf(this.currentMeal);
        if (indexOfFood !== -1) {
            this.snake.length = indexOfFood;
        }
        if (this.snake.length === 0) {
            this.gameOver = true;
            console.log('Snake is dead!');
        }
    }

    //Обновить результат счета
    updateScore() {
        //Считаем новый счет игры - перемножаем длину змеи на количество тиков и ...
        const newScore = this.snake.length * Game.lengthCoefficient + this.tick * Game.timeCoefficient;

        if (newScore > this.maxScore) {
            //если текущее значение счета превышает уже существещее то обновляем его
            this.maxScore = newScore;
        }
    }
}
