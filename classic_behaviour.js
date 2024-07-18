class Classic_behavior extends Behavior {
    constructor() {
        super();
    }

    firstGet = true;

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

        this.firstGet = true;
    }

    getValue(x, y) {
        while (this.firstGet) {
            this.generate_board();

            if (this.positions[x][y] == "0") { //if empty space => continue, else regenerate
                this.firstGet = false;
            }
        }

        return this.positions[x][y];
    }

    generate_board() {
        //empty out board
        this.positions = [];
        for (let i = 0; i < this.width; i++) {
            this.positions.push([]);
            for (let j = 0; j < this.height; j++) {
                this.positions[i].push("");
            }
        }


        // pick bomb positions
        let bomb_positions = new Set();
        for (let i = 0; i < this.bombs; i += 0) {
            let new_position = [Math.floor(Math.random() * this.width), Math.floor(Math.random() * this.height)];

            if (bomb_positions.has(new_position)) {
                //nothing
            } else {
                bomb_positions.add(new_position);
                i++;
            }
        }

        //burry bombs
        for (let p of bomb_positions) {
            this.positions[p[0]][p[1]] = "b";
        }


        //assign numbers
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                if (this.positions[i][j] == "b") { continue };

                let count = 0;
                if (this.isInside(i - 1, j - 1)) {if (this.positions[i - 1][j - 1] == "b") {count ++}}
                if (this.isInside(i + 0, j - 1)) {if (this.positions[i + 0][j - 1] == "b") {count ++}}
                if (this.isInside(i + 1, j - 1)) {if (this.positions[i + 1][j - 1] == "b") {count ++}}

                if (this.isInside(i - 1, j - 0)) {if (this.positions[i - 1][j - 0] == "b") {count ++}}
                if (this.isInside(i + 1, j - 0)) {if (this.positions[i + 1][j - 0] == "b") {count ++}}

                if (this.isInside(i - 1, j + 1)) {if (this.positions[i - 1][j + 1] == "b") {count ++}}
                if (this.isInside(i + 0, j + 1)) {if (this.positions[i + 0][j + 1] == "b") {count ++}}
                if (this.isInside(i + 1, j + 1)) {if (this.positions[i + 1][j + 1] == "b") {count ++}}


                this.positions[i][j] = "" + count;
            }
        }
    }

    isInside(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {
            return false;
        } else {
            return true;
        }
    }
}