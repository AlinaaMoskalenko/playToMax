const CELL_CONTENT_ARRAY = ['apple', 'orange', 'lemon', 'peach', 'plum'];
const CELL_BACKGROUND_ARRAY = ['rgba(0, 128, 0, 0.5)',
    'rgba(255, 140, 0, 0.5)',
    'rgba(255, 255, 0, 0.5)',
    'rgba(255, 68, 0, 0.5)',
    'rgba(128, 0, 128, 0.5)'];

export class Table {
    constructor(rootElement) {
        this.rootElement = rootElement;
        this.arrayOfFruit = [];
        this.render();
    }

    conditionHandler(id, title, x, y, i) {
        this.deleteChosenCell(i, id);
        this.findTheSameCell(x, y, title);
    }

    findTheSameCell(x, y, title) {
        this.arrayOfFruit.forEach((fruit, i) => {
            if (fruit.indexX === x - 1 && fruit.indexY === y && fruit.title === title)
                this.conditionHandler(fruit.id, fruit.title, fruit.indexX, fruit.indexY, i);

            if (fruit.indexX === x + 1 && fruit.indexY === y && fruit.title === title)
                this.conditionHandler(fruit.id, fruit.title, fruit.indexX, fruit.indexY, i);

            if (fruit.indexX === x && fruit.indexY === y - 1 && fruit.title === title)
                this.conditionHandler(fruit.id, fruit.title, fruit.indexX, fruit.indexY, i);

            if (fruit.indexX === x && fruit.indexY === y + 1 && fruit.title === title)
                this.conditionHandler(fruit.id, fruit.title, fruit.indexX, fruit.indexY, i);
        });
    }

    updateArrayOfFruit() {
        let i = 0;
        let j = 0;
        this.arrayOfFruit.forEach((fruit) => {
            if (j === 5) {
                j = 0;
                ++i;
            }
            fruit.indexX = j++;
            fruit.indexY = i;
        });
    }

    deleteChosenCell(i, id) {
        this.chosenCell = document.getElementById(`${id}`);
        this.chosenCell.parentNode.removeChild(this.chosenCell);
        this.chosenCell.removeEventListener('click', (event) => this.getChosenCell(event));
        this.arrayOfFruit.splice(i, 1);
    }

    updateTable(x, y, title) {
        this.findTheSameCell(x, y, title);
        this.updateArrayOfFruit();
    }

    getChosenCell(event) {
        this.arrayOfFruit.forEach((fruit, i) => {
            if (fruit.id === +event.target.id) {
                const [id, title, x, y] = [fruit.id, fruit.title, fruit.indexX, fruit.indexY];
                this.deleteChosenCell(i, id);
                this.updateTable(x, y, title);
            }
        });
    }

    render() {
        this.wrapper = document.createElement('div');
        this.wrapper.classList.add('wrapper');

        this.elementTable = document.createElement('div');
        this.elementTable.classList.add('table');

        let id = 0;

        for (let i = 0; i < 7; i++) {
            for (let j = 0; j < 5; j++) {

                this.cell = document.createElement('div');
                this.cell.classList.add('table__cell');
                this.cell.setAttribute('id', id);

                this.cell.addEventListener('click', (event) => this.getChosenCell(event));

                let random_index = Math.floor(Math.random() * 5);
                this.cell.textContent = CELL_CONTENT_ARRAY[random_index];
                this.cell.style.backgroundColor = CELL_BACKGROUND_ARRAY[random_index];

                let arr = {
                    id: id,
                    title: CELL_CONTENT_ARRAY[random_index],
                    indexX: j,
                    indexY: i
                }

                this.arrayOfFruit.push(arr);
                this.elementTable.appendChild(this.cell);
                id++;
            }
        }
        this.wrapper.appendChild(this.elementTable);
        this.rootElement.appendChild(this.wrapper);
    }
}