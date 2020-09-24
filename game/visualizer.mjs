//Вывод поля - передаем текущее положение змеи, еда, размер поля
export async function renderField(snakeCells, meal, fieldSize) {
    await delay(300);
    console.clear();
    for (let y = 0; y < fieldSize; y++) {
        //Ряд на поле
        let row = '';
        for (let x = 0; x < fieldSize; x++) {
            //Текущ
            let coord = `${ x };${ y }`;
            //Если еда и поле совпадает то ставим звездочку
            if (meal === coord) {
                row += '*';
                continue;
            }
            //Если совпадает то это голова змеи
            if (snakeCells[0] === coord) {
                row += '0';
                continue;
            }
            //Если еда входим в змею то ставим решетку
            if (snakeCells.includes(coord)) {
                row += '#';
                continue;
            }
            //Иначе просто точку в поле
            row += '.';
        }
        console.log(row)
    }
}

//Зачем нужна эта задержка?
function delay(time) {
    return new Promise(resolve => setTimeout(resolve, time));
}
