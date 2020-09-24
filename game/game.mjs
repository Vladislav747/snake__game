import { commands } from './coreMechanic.mjs';

var raznica = 0;

export function startGame(snake, meals, fieldSize, maxTicks) {
    console.log({snake, meals, fieldSize, maxTicks}, "startGame");
    //Чтобы не врезаться в стену

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
    if(meal){
        
        //Первый элмент массива это x а второй y
        const [ mealX, mealY ] = meal.split(';');

        //Голова змеи - split - Метод split возвращает новый массив. из 4;0 идет массив [4,0]
        const [ headX, headY ] = snake[0].split(';');
        //Шея змеи - split
        const [ neckX, neckY ] = snake[1].split(';');
        //Сдвиг головы относительно шеи по Оси X
        const xShift = headX - neckX;
        //Сдвиг головы относительно шеи по Оси Y
        const yShift = headY - neckY;

        if(raznica == 0){
            if(mealY > headY && headX == mealX && xShift == -1 ) return commands.TURN_LEFT;
            if(mealY > headY && headX == mealX && xShift == 1 ) return commands.TURN_RIGHT;
            if(mealY == headY && headX < mealX && yShift == 1) return commands.TURN_LEFT;
            if(mealY == headY && headX > mealX && yShift == 1) return commands.TURN_RIGHT;
            if(mealY == headY && headX > mealX && xShift == - 1) {
                raznica = headX - mealX - 1;
                return commands.FORWARD;
            }
        
            if(mealY > headY && headX == mealX && yShift == 1 ) {
                raznica = mealY - headY - 1;
                return commands.FORWARD;
            }
            if(mealY < headY && headX == mealX && yShift == -1 ) {
                raznica = headY - mealY - 1;
                return commands.FORWARD;
            }

            if(mealY < headY && headX == mealX && xShift == 1 ) {
                return commands.TURN_LEFT;
            }
            if(mealY < headY && headX == mealX && xShift == -1 ) {
                return commands.TURN_RIGHT;
            }

            if(mealY == headY && headX > mealX && xShift == 1) {
                raznica = headX - mealX - 1;
                return commands.FORWARD;
            }
            if(mealY == headY && headX < mealX && xShift == 1) {
                raznica = mealX - headX - 1;
                return commands.FORWARD;
            }

            //Диагональные движения
            if(mealY > headY && headX > mealX && xShift == 1) return commands.TURN_RIGHT;
            if(mealY > headY && headX > mealX && yShift == 1) return commands.TURN_RIGHT;
            if(mealY > headY && headX < mealX && yShift == 1 ) return commands.TURN_LEFT;
            if(mealY > headY && headX < mealX && xShift == 1) return commands.TURN_RIGHT;

            //Диагональные движения
            if(mealY < headY && headX > mealX && xShift == -1) return commands.TURN_RIGHT;
            if(mealY > headY && headX > mealX && xShift == -1) return commands.TURN_LEFT;

            if(mealY < headY && headX > mealX && yShift == -1) return commands.TURN_LEFT;
    
        }else{
            raznica--;
            return commands.FORWARD;
        }
    }
    
}
