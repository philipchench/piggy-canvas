let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
let pigApple = document.getElementById("pigApple");
let pigLine = document.getElementById("pigLine");
let pigLG = document.getElementById("pigLG");
let sizeMenu = document.getElementById("sizeMenu");
let reset = document.getElementById("reset");

const pigs = [
  "static/pig-apple.png",
  "static/pig-line.png",
  "static/pig-lg.png",
];
const pigSize = [20, 40, 75, 120];

let currentPig = 0;
let prev = {};
let drawing = false;

let currentImg = new Image();
currentImg.src = pigs[currentPig];

pigApple.onclick = () => {
  currentPig = 0;
  currentImg.src = pigs[currentPig];
};

pigLine.onclick = () => {
  currentPig = 1;
  currentImg.src = pigs[currentPig];
};

pigLG.onclick = () => {
  currentPig = 2;
  currentImg.src = pigs[currentPig];
};

reset.onclick = () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  socket.emit("reset");
};

let draw = (x, y, img, size) => {
  console.log("drawing a pig");
  ctx.drawImage(
    img,
    x - pigSize[size] / 2 - 20, // pigs have a 20px margin?!!
    y - pigSize[size] / 2 - 20,
    pigSize[size],
    pigSize[size]
  );
};

let drawInterval = (e) => {
  let canRun = true;
  return (e) => {
    if (canRun) {
      draw(e.pageX, e.pageY, currentImg, sizeMenu.value);
      socket.emit("drawPig", {
        x: e.pageX,
        y: e.pageY,
        imgIdx: currentPig,
        size: sizeMenu.value,
      });
      canRun = false;
      setTimeout(() => {
        canRun = true;
      }, 50);
    }
  };
};

let myDrawInterval = drawInterval();

// turn on drawing
canvas.onmousedown = (e) => {
  drawing = true;
  draw(e.pageX, e.pageY, currentImg, sizeMenu.value);
  socket.emit("drawPig", {
    x: e.pageX,
    y: e.pageY,
    imgIdx: currentPig,
    size: sizeMenu.value,
  });
};

canvas.onmouseup = () => {
  drawing = false;
};
// when mouse moves
canvas.onmousemove = (e) => {
  if (drawing) {
    myDrawInterval(e);
  }
};

let socket = io.connect("http://127.0.0.1:8080");

socket.on("receiveDrawPig", (data) => {
  img = new Image();
  img.src = pigs[data.imgIdx];
  draw(data.x, data.y, img, data.size);
});

socket.on("receiveReset", () => {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
});
