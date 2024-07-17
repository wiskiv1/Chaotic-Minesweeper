class game_board {

    constructor(w, h) {
        this.width = w;
        this.height = h;
        this.positions = []; // w * [h * ""]

        for (let i = 0; i < this.width; i++) {
            this.positions.push([]);
            for (let j = 0; j < this.height; j++) {
                this.positions[i].push("");
            }
        }

        resizeCanvas(50 + this.width * 25, 100 + this.height*25);
        this.show();
    }

    show() {
        background(192);

        //drawing cells
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                draw_cell(25 + 25*i, 80 + 25*j, this.positions[i][j]);
            }
        }
    }
}

function draw_cell(x, y, v) {
    push();

    if (v == "") {
        fill(189, 189, 189);
        stroke(123, 123, 123);
        strokeWeight(3);
        rect(x, y, 25, 25);
    }

    pop();
}