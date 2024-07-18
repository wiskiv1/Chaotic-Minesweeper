class Behavior {
    
    constructor() {
    }

    initialize(b) {
        this.width = b.width;
        this.height = b.height;
        this.bombs = b.bombs;
        this.positions = [];

        for (let i = 0; i < this.width; i++) {
            this.positions.push([]);
            for (let j = 0; j < this.height; j++) {
                this.positions[i].push("");
            }
        }
    }

    getValue(x, y) {}
}