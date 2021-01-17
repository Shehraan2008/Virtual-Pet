// Declaring Objects
let dog, happyDog, database, foodS, foodStock;
let xNum = foodS;
let numberOfFood, hour;
let input, ownerName, dogName, input1;

// Loading Images
function preload() {
  dogImage = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
  // woof = loadSound("bark.mp3");
}

function setup() {
  // Database
  database = firebase.database();

  input = select("#name");
  input2 = select("#dogName");

  var button = select("#submit");
  button.mousePressed(changeName);

  // Canvas
  const canvas = createCanvas(700, 500);

  // Objects and Sprites
  dog = createSprite(350, 350, 50, 50);
  dog.addImage("dog", dogImage);
  dog.scale = 0.2;

  // Fetching FoodStock from database
  foodStock = database.ref("Food");
  foodStock.on("value", readStock, catchError);
}

function draw() {
  // background
  background(46, 139, 87);
  // Informaton about the Dog.
  fill("white");
  textSize(24);
  textFont("VT323");
  text("🥛 Milk Bottles Left: " + numberOfFood, 10, 50);
  text(
    "Hi " + ownerName + ", I am " + dogName + " your Virtual Pet 🐕",
    15,
    100
  );

  // Draw the Sprites
  drawSprites();

  if (mousePressedOver(dog)) {
    // playSound(woof);
  }
}

// Adding Functions when Key is Pressed.
function keyPressed() {
  if (keyCode === UP_ARROW) {
    dog.addImage("happyDog", happyDog);
    writeStock(foodS);
  }
}

// Call back Functions fro the data
function readStock(data) {
  foodS = data.val();
}

// Reducing the Value fo Food.
function writeStock(x) {
  database.ref("/").update({
    Food: x - 1,
  });
  if (x <= 0) {
    database.ref("/").update({
      Food: 0,
    });
  }
  if (keyDown("B")) {
    database.ref("/").update({
      Food: 20,
    });
  }
  numberOfFood = x;
}

// Error handling
function catchError(error) {
  console.error(error);
}
// Naming
function changeName() {
  ownerName = input.value();
  dogName = input2.value();
}
