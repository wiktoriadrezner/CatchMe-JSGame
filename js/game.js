import Button from "./button.js";
import Animal from "./animal.js";
import Pig from "./pig.js";

let totalAnimals = 10;
let state = "start";
let animals = [];
let startButton;
let replayButton;

function setup() {
    createCanvas(1200, 700);
    startButton = new Button((width - 200) / 2, 300, 200, 60, "Start");
    replayButton = new Button((width - 200) / 2, 300, 200, 60, "Play again");
}
window.setup = setup;

function setupGame() {
    const animalSize = 50;
    for (let i = 0; i < totalAnimals; i++) {
        let animal = new Pig(
            Math.floor(Math.random() * (width - animalSize * 2) + animalSize / 2),
            Math.floor(Math.random() * (height - animalSize * 2) + animalSize / 2)
        );
        animals.push(animal);
        animal = new Animal(
            Math.floor(Math.random() * (width - animalSize * 2) + animalSize / 2),
            Math.floor(Math.random() * (height - animalSize * 2) + animalSize / 2)
        );
        animals.push(animal);
    }
}

function startScreen() {
    textSize(60);
    textAlign(CENTER);
    fill(0, 0, 0);
    noStroke();
    text("Catch the Pigs", 0, 200, width, 100);

    startButton.display();
}

function gameScreen() {
    for (let animal of animals) {
        animal.update();
        animal.display();
    }
    textSize(25);
    noStroke();
    fill(0, 0, 0);
    textAlign(LEFT);
    text("Pigs caught: " + (totalAnimals * 2 - animals.length), 20, 40);

    if (animals.length === 0) {
        state = "result";
    }
}

function resultScreen() {
    textSize(40);
    textAlign(CENTER);
    fill(0, 0, 0);
    noStroke();
    text("You caught all the pigs!", 0, 200, width, 100);

    replayButton.display();
}

function draw() {
    background("#F9F2F7");

    if (state === "start") {
        startScreen();
    } else if (state === "game") {
        gameScreen();
    } else if (state === "result") {
        resultScreen();
    }
}
window.draw = draw;

function mouseClicked() {
    if (state === "start") {
        if (startButton.hitTest(mouseX, mouseY)) {
            setupGame();
            state = "game";
        }
    } else if (state === "result") {
        if (replayButton.hitTest(mouseX, mouseY)) {
            setupGame();
            state = "game";
        }
    }
}
window.mouseClicked = mouseClicked;

function mousePressed() {
    if (state === "game") {
        for (let animal of animals) {
            if (animal.hitTest(mouseX, mouseY)) {
                animals.splice(animals.indexOf(animal), 1);
            }
        }
    }
}
window.mousePressed = mousePressed;
