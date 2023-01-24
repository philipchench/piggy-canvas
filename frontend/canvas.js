let canvas = document.getElementById("canvas");
let pigApple = document.getElementById("pigApple");
let pigLine = document.getElementById("pigLine");
let pigLG = document.getElementById("pigLG");
let sizeMenu = document.getElementById("sizeMenu");
let reset = document.getElementById("reset");

const pigs = ["staticpig-apple.png", "staticpig-line.png", "staticpig-lg.png"];
const pigSize = [25, 50, 75];

let currentPig = 0;
let currentSize = 1;

console.log(sizeMenu.value);

// let socket = io.connect("http://127.0.0.1:8080");
