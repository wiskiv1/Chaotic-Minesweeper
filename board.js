class game_board {

    behavior = null;

    constructor(w, h, b) {
        this.width = w;
        this.height = h;
        this.bombs = b;
        this.positions = []; // w * [h * ""]

        for (let i = 0; i < this.width; i++) {
            this.positions.push([]);
            for (let j = 0; j < this.height; j++) {
                this.positions[i].push("");
            }
        }

        resizeCanvas(40 + this.width * 25, 100 + this.height*25);
        this.show();
    }

    setBehavior(b) {
        if (this.behavior == null) {
            this.behavior = b;
            this.behavior.initialize(this);
        } else {
            console.log("behavior already set")
            //do nothing
        }
    }

    leftClick() {
        if (mouseX > 20 && mouseX < width - 20 && mouseY > 80 && mouseY < height - 20) {
            let x = Math.floor((mouseX - 20) / 25);
            let y = Math.floor((mouseY - 80) / 25);
            this.revealCell(x, y);

        }

        this.show();
    }

    rightClick() {
        if (mouseX > 20 && mouseX < width - 20 && mouseY > 80 && mouseY < height - 20) {
            let x = Math.floor((mouseX - 20) / 25);
            let y = Math.floor((mouseY - 80) / 25);
            this.flag(x, y);
        }
    }

    flag(x, y) {
        if (this.positions[x][y] == "") {
            this.positions[x][y] = "f";
            this.bombs--;
        } else if (this.positions[x][y] == "f") {
            this.positions[x][y] = "";
            this.bombs++;
        }

        this.show(); // redraw canvas
    }

    revealCell(x, y) {
        if (x < 0 || x >= this.width || y < 0 || y >= this.height) {return} // index out of bounds
        if (this.positions[x][y] != "" || this.behavior == null) {return} // do nothing

        this.positions[x][y] = this.behavior.getValue(x, y);
        
        if (this.positions[x][y] == "0") {
            this.revealCell(x - 1, y - 1);
            this.revealCell(x, y - 1);
            this.revealCell(x + 1, y - 1);
            this.revealCell(x - 1, y);
            this.revealCell(x + 1, y);
            this.revealCell(x - 1, y + 1);
            this.revealCell(x, y + 1);
            this.revealCell(x + 1, y + 1);
        }

        this.show();

        //TODO if cell is bomb, stop game

    }

    show() {
        background(192);

        //TODO draw all other UI elements

        //drawing cells
        for (let i = 0; i < this.width; i++) {
            for (let j = 0; j < this.height; j++) {
                draw_cell(20 + 25*i, 80 + 25*j, this.positions[i][j]);
            }
        }
    }
}

function draw_cell(x, y, v) { // cels kan be EMPTY, 0 -> 8, b, f
    push();

    if (v == "") {
        fill(189, 189, 189);
        stroke(123, 123, 123);
        strokeWeight(3);
        rect(x, y, 25, 25);
    } else if (v == "1") {
        fill(189);
        stroke(123);
        strokeWeight(1);
        rect(x, y, 25, 25);

        //number
        stroke(100, 100, 255);
        fill(100, 100, 255);
        textSize(23);
        text("1", x + 5, y + 20);
    } else if (v == "2") {
        fill(189);
        stroke(123);
        strokeWeight(1);
        rect(x, y, 25, 25);

        //number
        stroke(0, 123, 0);
        fill(0, 123, 0);
        textSize(23);
        text("2", x + 5, y + 20);
    } else if (v == "3") {
        fill(189);
        stroke(123);
        strokeWeight(1);
        rect(x, y, 25, 25);

        //number
        stroke(189, 100, 100);
        fill(189, 100, 100);
        textSize(23);
        text("3", x + 5, y + 20);
    } else if (v == "4") {
        fill(189);
        stroke(123);
        strokeWeight(1);
        rect(x, y, 25, 25);

        //number
        stroke(0, 0, 255);
        fill(0, 0, 255);
        textSize(23);
        text("4", x + 5, y + 20);
    } else if (v == "5") {
        fill(189);
        stroke(123);
        strokeWeight(1);
        rect(x, y, 25, 25);

        //number
        stroke(132, 0, 0);
        fill(132, 0, 0);
        textSize(23);
        text("5", x + 5, y + 20);
    } else if (v == "6") {
        fill(189);
        stroke(123);
        strokeWeight(1);
        rect(x, y, 25, 25);

        //number
        stroke(1, 130, 132);
        fill(1, 130, 132);
        textSize(23);
        text("6", x + 5, y + 20);
    } else if (v == "7") {
        fill(189);
        stroke(123);
        strokeWeight(1);
        rect(x, y, 25, 25);

        //number
        stroke(131, 0, 131);
        fill(131, 0, 131);
        textSize(23);
        text("7", x + 5, y + 20);
    } else if (v == "8") {
        fill(189);
        stroke(123);
        strokeWeight(1);
        rect(x, y, 25, 25);

        //number
        stroke(119);
        fill(119);
        textSize(23);
        text("8", x + 5, y + 20);
    } else if (v == "0") {
        fill(189);
        stroke(123);
        strokeWeight(1);
        rect(x, y, 25, 25);
    } else if (v == "f") {
        fill(189);
        stroke(123);
        strokeWeight(3);
        rect(x, y, 25, 25);

        //flag
        fill(189, 100, 100);
        noStroke();
        rect(x + 7, y + 5, 11, 10);
        stroke(123);
        strokeWeight(3);
        line(x + 7, y + 5, x + 7, y + 20);
    }  else if (v == "b") {
        fill(123);
        stroke(123);
        strokeWeight(3);
        rect(x, y, 25, 25);

        //bom
        fill(25);
        circle(x + 13, y + 15, 19);
        noStroke();
        rect(x + 10, y + 5, 6, 6);
        fill(189, 100, 100);
        rect(x + 12, y + 2, 2, 3)

    }

    pop();
}