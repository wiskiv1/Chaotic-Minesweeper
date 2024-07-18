var minesweeper;

function setup() {
    let canvas = createCanvas(800, 800);

    canvas.attribute("oncontextmenu", "event.preventDefault();");

    background(192);

    minesweeper = new game_board(30, 16, 99);
    mode = new Classic_behavior();
    minesweeper.setBehavior(mode);

    document.getElementById("defaultCanvas0").addEventListener("mouseup", (e) => {
        switch (e.button) {
            case 0:
              minesweeper.leftClick();
              break;
            case 1:
              console.log("Middle button clicked.");
              break;
            case 2:
              minesweeper.rightClick();
              break;
            default:
              console.log(`Unknown button code: ${e.button}`);
          }
    });
}

function draw() {

}